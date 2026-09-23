"use client";

import { useState } from "react";

import type { GewerbePayload, LeadPayload, PrivatpersonPayload, Thema } from "@/lib/types";

const THEMEN: Thema[] = [
  "Steueroptimierung",
  "Versicherungsvergleich",
  "Altersvorsorge und Investment",
  "Finanzierung und Umschuldung",
  "Sonstiges",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function KontaktFormular() {
  const [art, setArt] = useState<"privatperson" | "gewerbe">("privatperson");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [thema, setThema] = useState<Thema | "">("");
  const [firmenname, setFirmenname] = useState("");
  const [ansprechpartnerVorname, setAnsprechpartnerVorname] = useState("");
  const [ansprechpartnerNachname, setAnsprechpartnerNachname] = useState("");
  const [branche, setBranche] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const basis = { email, telefon, consent, hp, formStartedAt: startedAt };
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
        setErrorMessage(data.message ?? "Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    }
  }

  if (status === "success") {
    return (
      <p className="kontakt-status success">
        Danke für deine Anfrage. Wir melden uns in Kürze bei dir.
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
            Ja, ich möchte kostenlos und unverbindlich kontaktiert werden. Es gilt die{" "}
            <a href="/datenschutz">Datenschutzerklärung</a>.
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
