"use client";

import { useState } from "react";
import Link from "next/link";

// Colle ici ton lien de paiement Stripe (Stripe → Liens de paiement).
// Tant qu'il est vide, le bouton propose "Me prévenir" au lieu d'un 404.
const LIEN_PAIEMENT = "";

export default function Relance() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "apercu">("saisie");
  const [erreur, setErreur] = useState("");

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setEtat("envoi");
    try {
      const r = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error();
      setEtat("apercu");
    } catch {
      setEtat("saisie");
      setErreur("Cet email n'a pas l'air valide. Vérifie-le et réessaie.");
    }
  }

  return (
    <main className="pp">
      <style>{css}</style>
      <header className="pp-head">
        <Link href="/" className="pp-logo">
          Panier Perdu
        </Link>
        <span className="pp-step">Ta première relance</span>
      </header>
      <hr className="pp-rule" />

      {etat !== "apercu" ? (
        <form onSubmit={valider}>
          <h1>Où t&apos;envoyer ta relance ?</h1>
          <p className="pp-lead">
            Un email suffit. Tu vois ensuite à quoi ressemble la relance que
            recevraient tes clients.
          </p>
          <label htmlFor="email">Ton email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erreur && (
            <p role="alert" className="pp-err">
              {erreur}
            </p>
          )}
          <button className="pp-btn" disabled={etat === "envoi"}>
            {etat === "envoi" ? "Un instant…" : "Voir ma première relance"}
          </button>
          <p className="pp-note pp-center">
            Pas de spam. Tu peux te désinscrire quand tu veux.
          </p>
        </form>
      ) : (
        <section>
          <h1>Voilà ce que reçoit ton client</h1>
          <p className="pp-lead">
            Exemple avec une boutique fictive. Le nom du client, les produits
            et ta boutique sont repris automatiquement.
          </p>

          <p className="pp-tag">Relance 1, quelques heures après</p>
          <article className="pp-mail">
            <p className="pp-subj">Objet : Camille, ton panier t&apos;attend</p>
            <p>Bonjour Camille,</p>
            <p>
              Tu as laissé 2 articles dans ton panier chez Atelier Lune :
              Bougie ambrée et Porte-encens en laiton.
            </p>
            <p>Ils sont toujours disponibles, tu peux finir ta commande ici.</p>
            <p className="pp-fake">[ Finir ma commande ]</p>
            <p>À bientôt,</p>
            <p>L&apos;équipe Atelier Lune</p>
          </article>

          <p className="pp-tag">Relance 2, quelques jours après</p>
          <article className="pp-mail">
            <p className="pp-subj">Objet : Camille, dernier rappel pour ton panier</p>
            <p>Bonjour Camille,</p>
            <p>
              Ton panier chez Atelier Lune est toujours là. Si tu veux, voici
              un petit coup de pouce : le code BIENTOT10 te donne 10 % de
              réduction.
            </p>
            <p className="pp-note">
              Le code promo est facultatif : tu choisis de l&apos;ajouter ou non.
            </p>
          </article>

          <hr className="pp-rule" />
          <p className="pp-lead">
            Panier Perdu envoie ces deux emails à ta place, pour 29 €/mois.
            Sans engagement.
          </p>

          {LIEN_PAIEMENT ? (
            <a href={LIEN_PAIEMENT} className="pp-btn">
              Activer mes relances, 29 €/mois
            </a>
          ) : (
            <>
              <button className="pp-btn" disabled>
                Activer mes relances, bientôt disponible
              </button>
              <p className="pp-note pp-center">
                On t&apos;écrit à {email} dès l&apos;ouverture.
              </p>
            </>
          )}
          <Link href="/questionnaire" className="pp-link">
            Refaire le questionnaire
          </Link>
        </section>
      )}
    </main>
  );
}

const css = `
.pp{--bg:#0e1628;--ink:#f3ede2;--mute:#9aa3b5;--line:#243049;--acc:#e0501f;
  min-height:100vh;background:var(--bg);color:var(--ink);
  padding:20px 22px 56px;max-width:560px;margin:0 auto;line-height:1.5}
.pp-head{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:14px}
.pp-logo{font-weight:700;font-size:1.15rem;color:var(--ink);text-decoration:none}
.pp-step{color:var(--mute);font-size:.9rem}
.pp-rule{border:0;border-top:1px solid var(--line);margin:0 0 36px}
.pp h1{font-size:2rem;line-height:1.15;margin:0 0 12px;font-weight:700}
.pp-lead{color:var(--mute);font-size:1.05rem;margin:0 0 24px}
.pp label{display:block;margin:20px 0 8px;font-weight:600}
.pp input{width:100%;padding:14px;font:inherit;font-size:1rem;color:var(--ink);
  background:transparent;border:1px solid var(--line);border-radius:6px}
.pp input:focus-visible,.pp-btn:focus-visible,.pp-link:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.pp-btn{display:block;width:100%;margin-top:28px;padding:16px;text-align:center;
  font:inherit;font-weight:700;color:#fff;background:var(--acc);border:0;border-radius:6px;
  text-decoration:none;cursor:pointer}
.pp-btn:disabled{opacity:.45;cursor:not-allowed}
.pp-link{display:block;margin:20px auto 0;text-align:center;color:var(--mute);text-decoration:underline}
.pp-err{color:#ff9b7a;margin:12px 0 0}
.pp-note{color:var(--mute);font-size:.88rem}
.pp-center{text-align:center;margin-top:10px}
.pp-tag{font-weight:600;margin:28px 0 10px}
.pp-mail{border:1px solid var(--line);border-radius:8px;padding:6px 18px}
.pp-mail p{margin:12px 0}
.pp-subj{color:var(--mute);font-size:.92rem;border-bottom:1px solid var(--line);padding-bottom:10px}
.pp-fake{display:inline-block;background:var(--acc);color:#fff;padding:8px 14px;border-radius:5px;font-weight:600}
`;