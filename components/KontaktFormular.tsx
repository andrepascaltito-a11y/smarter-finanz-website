"use client";

import { useState } from "react";

import { CONSENT_TEXT, ERSTINFO_TEXT } from "@/lib/consent";
import {
  ERREICHBARKEIT_FORMEN,
  ERREICHBARKEIT_TAGE,
  ERREICHBARKEIT_ZEITEN,
  HINWEIS_MAX,
  type Erreichbarkeit,
} from "@/lib/erreichbarkeit";
import { ERFOLG_TEXTE, ERREICHBARKEIT_TEXTE, FEHLER_TEXTE } from "@/lib/formular-texte";
import type { GewerbePayload, LeadPayload, PrivatpersonPayload, Thema } from "@/lib/types";

// CONSENT_TEXT ist die einzige Quelle der Wahrheit fuer den Einwilligungstext
// (auch das, was als DSGVO-Nachweis ins CRM geschrieben wird). Der Link zur
// Datenschutzerklaerung wird an der passenden Stelle im Satz eingebettet,
// ohne den Wortlaut zu veraendern.
const CONSENT_LINK_TEXT = "Datenschutzerklärung";
const [CONSENT_TEXT_BEFORE_LINK, CONSENT_TEXT_AFTER_LINK] = CONSENT_TEXT.split(CONSENT_LINK_TEXT);

const THEMEN: Thema[] = [
  "Steueroptimierung",
  "Versicherungsvergleich",
  "Altersvorsorge und Investment",
  "Finanzierung und Umschuldung",
  "Sonstiges",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function KontaktFormular({ defaultArt = "privatperson" }: { defaultArt?: "privatperson" | "gewerbe" }) {
  const [art, setArt] = useState<"privatperson" | "gewerbe">(defaultArt);
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [thema, setThema] = useState<Thema | "">("");
  const [firmenname, setFirmenname] = useState("");
  const [ansprechpartnerVorname, setAnsprechpartnerVorname] = useState("");
  const [ansprechpartnerNachname, setAnsprechpartnerNachname] = useState("");
  const [branche, setBranche] = useState("");
  const [tage, setTage] = useState<string[]>([]);
  const [zeiten, setZeiten] = useState<string[]>([]);
  const [gespraechsform, setGespraechsform] = useState<string | null>(null);
  const [hinweis, setHinweis] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [consent, setConsent] = useState(false);
  const [erstinfoZustimmung, setErstinfoZustimmung] = useState(false);
  const [hp, setHp] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggle(liste: string[], setListe: (v: string[]) => void, id: string) {
    setListe(liste.includes(id) ? liste.filter((x) => x !== id) : [...liste, id]);
  }

  const erreichbarkeit: Erreichbarkeit | null =
    tage.length || zeiten.length || gespraechsform || hinweis.trim()
      ? { tage, zeiten, form: gespraechsform, hinweis: hinweis.trim() }
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const basis = { email, telefon, consent, erstinfoZustimmung, hp, formStartedAt: startedAt };
    const payload: LeadPayload =
      art === "privatperson"
        ? ({
            ...basis,
            art: "privatperson",
            vorname,
            nachname,
            thema: thema || null,
          } satisfies PrivatpersonPayload)
        : ({
            ...basis,
            art: "gewerbe",
            firmenname,
            ansprechpartnerVorname,
            ansprechpartnerNachname,
            branche,
            erreichbarkeit,
          } satisfies GewerbePayload);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? FEHLER_TEXTE[art]);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(FEHLER_TEXTE[art]);
    }
  }

  if (status === "success") {
    return (
      <p className="kontakt-status success">
        {art === "privatperson"
          ? ERFOLG_TEXTE.privatperson
          : erreichbarkeit
            ? ERFOLG_TEXTE.gewerbeMitErreichbarkeit
            : ERFOLG_TEXTE.gewerbe}
      </p>
    );
  }

  return (
    <div>
      <div className="kontakt-tabs">
        <button
          type="button"
          className={`kontakt-tab${art === "privatperson" ? " active" : ""}`}
          onClick={() => setArt("privatperson")}
        >
          Privatperson
        </button>
        <button
          type="button"
          className={`kontakt-tab${art === "gewerbe" ? " active" : ""}`}
          onClick={() => setArt("gewerbe")}
        >
          Unternehmer:in
        </button>
      </div>

      <form className="kontakt-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="hp"
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />

        {art === "privatperson" ? (
          <>
            <div className="row2">
              <div>
                <label htmlFor="vorname">Vorname</label>
                <input
                  id="vorname"
                  type="text"
                  required
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="nachname">Nachname</label>
                <input
                  id="nachname"
                  type="text"
                  required
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="thema">Thema</label>
              <select
                id="thema"
                required
                value={thema}
                onChange={(e) => setThema(e.target.value as Thema)}
              >
                <option value="">Bitte wählen</option>
                {THEMEN.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="firmenname">Firmenname</label>
              <input
                id="firmenname"
                type="text"
                required
                value={firmenname}
                onChange={(e) => setFirmenname(e.target.value)}
              />
            </div>
            <div className="row2">
              <div>
                <label htmlFor="ap-vorname">Ansprechpartner Vorname</label>
                <input
                  id="ap-vorname"
                  type="text"
                  required
                  value={ansprechpartnerVorname}
                  onChange={(e) => setAnsprechpartnerVorname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ap-nachname">Ansprechpartner Nachname</label>
                <input
                  id="ap-nachname"
                  type="text"
                  required
                  value={ansprechpartnerNachname}
                  onChange={(e) => setAnsprechpartnerNachname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="branche">Branche</label>
              <input
                id="branche"
                type="text"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
              />
            </div>

            <fieldset className="erreichbar" aria-describedby="erreichbar-einleitung">
              <legend>
                {ERREICHBARKEIT_TEXTE.titel} <span>{ERREICHBARKEIT_TEXTE.badge}</span>
              </legend>
              <p className="erreichbar-intro" id="erreichbar-einleitung">{ERREICHBARKEIT_TEXTE.einleitung}</p>

              <fieldset className="chip-fieldset" aria-describedby="hinweis-tage">
                <legend>
                  {ERREICHBARKEIT_TEXTE.tage.label} <small id="hinweis-tage">{ERREICHBARKEIT_TEXTE.tage.hinweis}</small>
                </legend>
                <div className="chip-row">
                  {ERREICHBARKEIT_TAGE.map((o) => (
                    <label key={o.id} className={`chip${tage.includes(o.id) ? " on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={tage.includes(o.id)}
                        onChange={() => toggle(tage, setTage, o.id)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="chip-fieldset" aria-describedby="hinweis-zeiten">
                <legend>
                  {ERREICHBARKEIT_TEXTE.zeiten.label} <small id="hinweis-zeiten">{ERREICHBARKEIT_TEXTE.zeiten.hinweis}</small>
                </legend>
                <div className="chip-row">
                  {ERREICHBARKEIT_ZEITEN.map((o) => (
                    <label key={o.id} className={`chip${zeiten.includes(o.id) ? " on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={zeiten.includes(o.id)}
                        onChange={() => toggle(zeiten, setZeiten, o.id)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="chip-fieldset" aria-describedby="hinweis-form">
                <legend>
                  {ERREICHBARKEIT_TEXTE.form.label} <small id="hinweis-form">{ERREICHBARKEIT_TEXTE.form.hinweis}</small>
                </legend>
                <div className="chip-row">
                  {ERREICHBARKEIT_FORMEN.map((o) => (
                    <label key={o.id} className={`chip${gespraechsform === o.id ? " on" : ""}`}>
                      <input
                        type="radio"
                        name="gespraechsform"
                        checked={gespraechsform === o.id}
                        onChange={() => setGespraechsform(o.id)}
                      />
                      {o.label}
                    </label>
                  ))}
                  {gespraechsform && (
                    <button type="button" className="chip-reset" onClick={() => setGespraechsform(null)}>
                      {ERREICHBARKEIT_TEXTE.form.zuruecksetzen}
                    </button>
                  )}
                </div>
              </fieldset>

              <div>
                <label htmlFor="erreichbar-hinweis">{ERREICHBARKEIT_TEXTE.hinweis.label}</label>
                <input
                  id="erreichbar-hinweis"
                  type="text"
                  maxLength={HINWEIS_MAX}
                  placeholder={ERREICHBARKEIT_TEXTE.hinweis.platzhalter}
                  aria-describedby="erreichbar-hinweis-hilfe"
                  value={hinweis}
                  onChange={(e) => setHinweis(e.target.value)}
                />
                <small className="field-hint" id="erreichbar-hinweis-hilfe">
                  {ERREICHBARKEIT_TEXTE.hinweis.datenschutz}
                </small>
                <small className="field-hint field-count" aria-live={hinweis.length >= HINWEIS_MAX ? "polite" : "off"}>
                  {ERREICHBARKEIT_TEXTE.hinweis.zaehler(hinweis.length)}
                </small>
              </div>
            </fieldset>
          </>
        )}

        <div className="row2">
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="telefon">Telefon</label>
            <input
              id="telefon"
              type="tel"
              required
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
            />
          </div>
        </div>

        <label className="consent-row">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            {CONSENT_TEXT_BEFORE_LINK}
            <a href="/datenschutz">{CONSENT_LINK_TEXT}</a>
            {CONSENT_TEXT_AFTER_LINK}
          </span>
        </label>

        <label className="consent-row">
          <input
            type="checkbox"
            required
            checked={erstinfoZustimmung}
            onChange={(e) => setErstinfoZustimmung(e.target.checked)}
          />
          <span>
            {ERSTINFO_TEXT} <a href="/erstinformation" target="_blank" rel="noopener">Erstinformation ansehen</a>
          </span>
        </label>

        <button type="submit" className="btn btn-gold" disabled={status === "submitting"}>
          {status === "submitting" ? "Wird gesendet…" : "Unverbindlich anfragen"}
        </button>

        {status === "error" && errorMessage && (
          <p className="kontakt-status error">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
