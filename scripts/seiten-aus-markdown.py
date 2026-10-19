#!/usr/bin/env python3
"""Erzeugt lib/seiten-inhalt.ts aus der Textdatei von Mia (Vault: 03-Marketing/Content/Mia-SEO-Phase1-Texte-*.md).

Aufruf:  python3 scripts/seiten-aus-markdown.py <datei1.md> [<datei2.md> ...] [--veroeffentlicht slug1,slug2]

- Mehrere Textdateien sind moeglich (zum Beispiel Phase 1 und Blog-Chargen), die Seiten werden in dieser Reihenfolge
  zusammengefuehrt. Ein doppelter Slug bricht ab.
- Neue Seiten werden mit published: false erzeugt. Bereits freigegebene Seiten behalten ihr Flag (es wird aus der
  vorhandenen lib/seiten-inhalt.ts gelesen). Freigabe nur durch Andre: Slugs ueber --veroeffentlicht oder per Hand
  (published: true).
- Das Format der Markdown-Datei steht oben in Mias Datei ("So baut Claude aus dieser Datei").
- Das Skript ist wiederholbar: Aenderungen an Mias Texten einlesen, Diff pruefen, committen.
"""
import json
import re
import sys
from pathlib import Path

KURZNAMEN = {
    "orte/alfeld": "Alfeld (Leine)",
    "orte/holzminden-hoexter": "Holzminden und Höxter",
    "orte/hildesheim": "Hildesheim",
    "orte/hannover": "Hannover",
    "branchen/handwerk-bau": "Handwerk und Bau",
    "branchen/pflegedienste": "Pflegedienste",
    "branchen/kfz-betriebe": "Kfz-Betriebe",
    "branchen/gastronomie": "Gastronomie",
    "branchen/reinigung": "Reinigung",
    "branchen/landwirtschaft": "Landwirtschaft",
    "weser-und-leinebergland": "Weser- und Leinebergland",
    "ueber-andre": "Über André",
}
BILDER = {"alfeld", "holzminden", "hildesheim", "hannover", "hoexter"}
WARN = []


def warn(msg):
    WARN.append(msg)


def bloecke(zeilen):
    """Zerlegt Zeilen in Absatz- und Listenbloecke (durch Leerzeilen getrennt)."""
    out, cur = [], []
    for z in zeilen + [""]:
        if z.strip() == "":
            if cur:
                out.append(cur)
                cur = []
        else:
            cur.append(z.rstrip())
    return out


def inhalt_zu_abschnitten(zeilen):
    res = []
    for b in bloecke(zeilen):
        if all(re.match(r"^\s*-\s+", z) or re.match(r"^\s{2,}\S", z) for z in b) and re.match(r"^\s*-\s+", b[0]):
            punkte = []
            for z in b:
                m = re.match(r"^\s*-\s+(.*)$", z)
                if m:
                    punkte.append(m.group(1).strip())
                else:
                    punkte[-1] += " " + z.strip()
            res.append({"art": "ul", "punkte": punkte})
        else:
            res.append({"art": "p", "text": " ".join(z.strip() for z in b)})
    return res


def tabelle(zeilen):
    kopf, zl = None, []
    rest_start = len(zeilen)
    for i, z in enumerate(zeilen):
        if z.strip().startswith("|"):
            zellen = [c.strip() for c in z.strip().strip("|").split("|")]
            if kopf is None:
                kopf = zellen
            elif all(re.fullmatch(r":?-{3,}:?", c) for c in zellen):
                continue
            else:
                zl.append(zellen)
        elif kopf is not None and z.strip() == "":
            rest_start = i
            break
        elif kopf is not None:
            rest_start = i
            break
    return kopf, zl, zeilen[rest_start:]


def parse_seite(block):
    zeilen = block.split("\n")
    m = re.search(r"```yaml\n(.*?)```", block, re.S)
    if not m:
        raise SystemExit("yaml-Block fehlt")
    y = {}
    for z in m.group(1).splitlines():
        if ":" in z:
            k, v = z.split(":", 1)
            y[k.strip()] = v.strip()
    nach = block[m.end():]
    teile = re.split(r"^### ", nach, flags=re.M)[1:]
    seite = {"einleitung": [], "kurz": [], "abschnitte": [], "faq": [], "links": [], "quellen": [], "cta": {"text": ""}}
    for t in teile:
        kopf, _, rumpf = t.partition("\n")
        kopf = kopf.strip()
        zl = rumpf.split("\n")
        if kopf == "Einleitung":
            seite["einleitung"] = [" ".join(z.strip() for z in b) for b in bloecke(zl)]
        elif kopf == "Kurz beantwortet":
            for z in zl:
                mm = re.match(r"^-\s+\*\*(.+?)\*\*\s+(.*)$", z.strip())
                if mm:
                    seite["kurz"].append({"frage": mm.group(1), "antwort": mm.group(2)})
        elif kopf.startswith("H2:"):
            seite["abschnitte"].append({"art": "h2", "text": kopf[3:].strip()})
            seite["abschnitte"] += inhalt_zu_abschnitten(zl)
        elif kopf.startswith("Tabelle:"):
            k, rows, rest = tabelle(zl)
            seite["abschnitte"].append({"art": "tabelle", "titel": kopf[8:].strip(), "kopf": k, "zeilen": rows})
            seite["abschnitte"] += inhalt_zu_abschnitten(rest)
        elif kopf == "FAQ":
            cur = None
            for z in zl:
                mm = re.match(r"^\*\*(.+)\*\*\s*$", z.strip())
                if mm:
                    cur = {"frage": mm.group(1), "zeilen": []}
                    seite["faq"].append(cur)
                elif cur is not None:
                    cur["zeilen"].append(z)
            for f in seite["faq"]:
                f["antwort"] = "\n\n".join(" ".join(z.strip() for z in b) for b in bloecke(f.pop("zeilen")))
        elif kopf == "Interne Links":
            for z in zl:
                mm = re.match(r"^-\s+(.+?)\|(.+)$", z.strip())
                if mm:
                    pfad = mm.group(1).strip()
                    seite["links"].append({"pfad": pfad if pfad.startswith("/") else "/" + pfad, "text": mm.group(2).strip()})
        elif kopf == "Quellen":
            seite["quellen"] = [m2.group(1).strip() for z in zl if (m2 := re.match(r"^-\s+(.*)$", z.strip()))]
        elif kopf == "CTA":
            seite["cta"] = {"text": " ".join(z.strip() for b in bloecke(zl) for z in b)}
        else:
            warn(f"Unbekannter Abschnitt '{kopf}' in {y.get('slug')}")
    return y, seite


def baue(y, s, veroeffentlicht):
    slug_voll = y["slug"]
    typ = y["typ"]
    slug = slug_voll.split("/", 1)[1] if "/" in slug_voll else slug_voll
    if typ not in ("ort", "branche", "hub", "autor", "beitrag"):
        raise SystemExit(f"Unbekannter typ {typ} in {slug_voll}")
    kurzname = KURZNAMEN.get(slug_voll) or y["title"].split(" | ")[0]
    out = {
        "typ": typ,
        "slug": slug,
        "published": slug_voll in veroeffentlicht or slug in veroeffentlicht,
        "title": y["title"],
        "description": y["description"],
        "h1": y["h1"],
        "kurzname": kurzname,
        "stand": y.get("stand", "Oktober 2026"),
    }
    b = y.get("bildschluessel", "none")
    if b in BILDER:
        out["bilder"] = [b]
    elif b != "none":
        warn(f"Unbekannter bildschluessel {b} in {slug_voll}")
    if y.get("karte"):
        out["karte"] = {"datei": y["karte"], "alt": y.get("karte_alt", "")}
        if y.get("karte_story"):
            out["karte"]["story"] = y["karte_story"]
    if typ == "autor":
        out["portrait"] = {"datei": "/andre-tito.jpg", "alt": "André Pascal Tito, Versicherungsmakler in Alfeld (Leine)"}
    out.update({k: s[k] for k in ("einleitung", "kurz", "abschnitte", "faq", "links", "quellen", "cta")})
    if len(y["title"]) > 60:
        warn(f"{slug_voll}: title hat {len(y['title'])} Zeichen (empfohlen hoechstens 60)")
    if len(y["description"]) > 155:
        warn(f"{slug_voll}: description hat {len(y['description'])} Zeichen (empfohlen hoechstens 155)")
    text = json.dumps(out, ensure_ascii=False)
    if re.search("[–—]", text):
        warn(f"{slug_voll}: enthaelt Gedankenstrich")
    for wort in ("unabhängig", "kostenlos", "kostenneutral", "Servicepauschale"):
        if re.search(wort, text, re.I):
            warn(f"{slug_voll}: enthaelt Sperrwort '{wort}' (pruefen, ob in verneinender Aussage)")
    return out


def main():
    args = sys.argv[1:]
    if not args:
        raise SystemExit(__doc__)
    veroeffentlicht = set()
    if "--veroeffentlicht" in args:
        i = args.index("--veroeffentlicht")
        veroeffentlicht = set(args[i + 1].split(","))
        del args[i : i + 2]
    quellen = [Path(a).expanduser() for a in args if not a.startswith("--")]
    ziel = Path(__file__).resolve().parent.parent / "lib" / "seiten-inhalt.ts"
    # Bereits freigegebene Seiten behalten ihr Flag
    if ziel.exists():
        try:
            alt = ziel.read_text(encoding="utf-8")
            alt_json = json.loads(alt[alt.index("export const SEITEN: Seite[] = ") + len("export const SEITEN: Seite[] = "):].rstrip().rstrip(";"))
            for a in alt_json:
                if a.get("published"):
                    veroeffentlicht.add(a["slug"])
        except (ValueError, KeyError):
            warn("Vorhandene Freigaben konnten nicht gelesen werden, alle Seiten gelten als Entwurf.")
    seiten = []
    gesehen = set()
    for quelle in quellen:
        text = quelle.read_text(encoding="utf-8")
        bloecke_seiten = re.split(r"^## Seite: .+$", text, flags=re.M)[1:]
        for blk in bloecke_seiten:
            blk = re.split(r"^---\s*$", blk, flags=re.M)[0]
            y, s = parse_seite(blk)
            seite = baue(y, s, veroeffentlicht)
            if seite["slug"] in gesehen:
                raise SystemExit(f"Doppelter Slug: {seite['slug']} (Datei {quelle.name})")
            gesehen.add(seite["slug"])
            seiten.append(seite)
    kopf = (
        "// Inhalte der Orts-, Branchen-, Hub-, Autoren- und Beitragsseiten. Aufbau und Freigabe-Flag: siehe lib/seiten.ts.\n"
        "// ERZEUGT aus den Textdateien von Mia (Vault, 03-Marketing/Content/): "
        + ", ".join(q.name for q in quellen)
        + "\n// mit scripts/seiten-aus-markdown.py. Texte nicht hier ändern, sondern in der Quelldatei und neu erzeugen,\n"
        "// sonst gehen Änderungen verloren. Rita hat die Fassungen geprüft.\n"
        "// Freigabe durch André: Skript mit --veroeffentlicht neu laufen lassen oder published auf true setzen.\n\n"
        'import type { Seite } from "./seiten";\n\n'
        "export const SEITEN: Seite[] = "
    )
    ziel.write_text(kopf + json.dumps(seiten, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"{len(seiten)} Seiten geschrieben nach {ziel}")
    for s in seiten:
        print(f"  {s['typ']:8} {s['slug']:48} {len(s['abschnitte'])} Abschnitte, {len(s['faq'])} FAQ, {len(s['links'])} Links, {len(s['quellen'])} Quellen, published={s['published']}")
    for w in WARN:
        print("WARNUNG:", w)


if __name__ == "__main__":
    main()
