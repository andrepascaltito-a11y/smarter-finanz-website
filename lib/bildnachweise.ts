// Hintergrundbilder der Ortsseiten (frei lizenzierte Fotos von Wikimedia Commons, 14.10.2026).
// Lizenzen verlangen die Namensnennung (CC BY, CC BY-SA). Jede Seite zeigt unten die Zeile aus bildnachweis().
// Dateien liegen in public/orte/, 2560 px breit (JPEG, Qualitaet 80), die Auslieferung uebernimmt next/image.
// Neue Bilder nur mit freier Lizenz und mit Eintrag hier. Original-Dateiname und Quelle bleiben nachvollziehbar.

export type Ortsbild = {
  /** Pfad unter public/ */
  datei: string;
  /** Kurzbeschreibung des Motivs fuer die Bildunterschrift */
  motiv: string;
  autor: string;
  lizenz: string;
  lizenzUrl: string;
  /** Seite des Bildes auf Wikimedia Commons */
  quelle: string;
  /** Ausrichtung des Ausschnitts im breiten Band (CSS object-position) */
  position: string;
};

export type OrtSchluessel = "holzminden" | "hildesheim" | "alfeld" | "hannover" | "hoexter";

export const ORTSBILDER: Record<OrtSchluessel, Ortsbild> = {
  holzminden: {
    datei: "/orte/holzminden.jpg",
    motiv: "Weser mit Weserbrücke in Holzminden",
    autor: "Tsungam",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelle: "https://commons.wikimedia.org/wiki/File:H%C3%B6xter_-_2018-04-17_-_Weserbr%C3%BCcke_Holzminden_(14).jpg",
    position: "50% 55%",
  },
  hildesheim: {
    datei: "/orte/hildesheim.jpg",
    motiv: "Marktplatz mit Knochenhaueramtshaus in Hildesheim",
    autor: "Benjamin Smith",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelle: "https://commons.wikimedia.org/wiki/File:Hildesheim_-_Marktplatz_with_Knochenhaueramtshaus.jpg",
    position: "50% 40%",
  },
  alfeld: {
    datei: "/orte/alfeld.jpg",
    motiv: "Marktplatz mit Rathaus in Alfeld (Leine)",
    autor: "GeorgDerReisende",
    lizenz: "CC BY-SA 4.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    quelle: "https://commons.wikimedia.org/wiki/File:Marktplatz,_2,_Alfeld,_Landkreis_Hildesheim.jpg",
    position: "50% 35%",
  },
  hannover: {
    datei: "/orte/hannover.jpg",
    motiv: "Neues Rathaus in Hannover",
    autor: "Christo",
    lizenz: "CC0 1.0",
    lizenzUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    quelle: "https://commons.wikimedia.org/wiki/File:Hannover,_Neues_Rathaus,_2.jpg",
    position: "50% 45%",
  },
  hoexter: {
    datei: "/orte/hoexter.jpg",
    motiv: "Weser bei Höxter",
    autor: "CEphoto, Uwe Aranas",
    lizenz: "CC BY-SA 3.0",
    lizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    quelle: "https://commons.wikimedia.org/wiki/File:H%C3%B6xter_Germany_Weser-River-01.jpg",
    position: "50% 50%",
  },
};

/** Bildunterschrift mit Namensnennung nach den Lizenzbedingungen. CC0 braucht keine Nennung, sie schadet aber nicht. */
export function bildnachweis(ort: OrtSchluessel): { text: string; lizenzUrl: string; quelle: string } {
  const b = ORTSBILDER[ort];
  return { text: `Bild: ${b.motiv}. Foto: ${b.autor}, ${b.lizenz}, Wikimedia Commons`, lizenzUrl: b.lizenzUrl, quelle: b.quelle };
}
