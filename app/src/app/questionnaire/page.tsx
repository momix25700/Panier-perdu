"use client";

import Link from "next/link";
import { useState } from "react";

type Option = { label: string; valeur: number };
type Question = {
  id: string;
  titre: string;
  aide?: string;
  options: Option[];
};

const PRIX = 29;
const TAUX_RECUPERATION = 0.08;

const questions: Question[] = [
  {
    id: "commandes",
    titre: "Combien de commandes reçois-tu par mois ?",
    aide: "Une estimation suffit.",
    options: [
      { label: "Moins de 20", valeur: 15 },
      { label: "20 à 50", valeur: 35 },
      { label: "50 à 100", valeur: 75 },
      { label: "Plus de 100", valeur: 130 },
    ],
  },
  {
    id: "panier",
    titre: "Quel est ton panier moyen ?",
    aide: "Le montant d'une commande type.",
    options: [
      { label: "Moins de 30 €", valeur: 25 },
      { label: "30 à 60 €", valeur: 45 },
      { label: "60 à 100 €", valeur: 80 },
      { label: "Plus de 100 €", valeur: 120 },
    ],
  },
  {
    id: "paient",
    titre: "Sur 10 personnes qui remplissent un panier, combien paient ?",
    aide: "Les autres partent sans acheter.",
    options: [
      { label: "1 ou 2", valeur: 0.15 },
      { label: "3 ou 4", valeur: 0.35 },
      { label: "5 ou 6", valeur: 0.55 },
      { label: "7 ou plus", valeur: 0.75 },
    ],
  },
  {
    id: "aujourdhui",
    titre: "Que fais-tu aujourd'hui pour les paniers abandonnés ?",
    options: [
      { label: "Rien", valeur: 0 },
      { label: "Je relance à la main, de temps en temps", valeur: 1 },
      { label: "J'ai déjà un outil", valeur: 2 },
      { label: "Je ne savais pas que c'était possible", valeur: 3 },
    ],
  },
  {
    id: "plateforme",
    titre: "Sur quoi est ta boutique ?",
    options: [
      { label: "Shopify", valeur: 0 },
      { label: "WooCommerce", valeur: 1 },
      { label: "Autre", valeur: 2 },
    ],
  },
  {
    id: "temps",
    titre: "Combien de temps par semaine te prend ta boutique ?",
    aide: "Tout compris : commandes, emails, produits.",
    options: [
      { label: "Moins de 2 h", valeur: 0 },
      { label: "2 à 5 h", valeur: 1 },
      { label: "5 à 10 h", valeur: 2 },
      { label: "Plus de 10 h", valeur: 3 },
    ],
  },
];

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type Reponse = { label: string; valeur: number };

export default function Questionnaire() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Record<string, Reponse>>({});

  const total = questions.length;
  const termine = etape >= total;

  function choisir(q: Question, o: Option) {
    const suite = { ...reponses, [q.id]: { label: o.label, valeur: o.valeur } };
    setReponses(suite);
    setEtape(etape + 1);
    if (etape + 1 >= total) {
      try {
        sessionStorage.setItem("pp_reponses", JSON.stringify(suite));
      } catch {
        // stockage indisponible : on continue sans
      }
    }
  }

  function recommencer() {
    setReponses({});
    setEtape(0);
  }

  const entete = (
    <header className="flex items-center justify-between border-b border-filet py-4">
      <Link href="/" className="font-titre text-lg font-extrabold tracking-tight">
        Panier Perdu
      </Link>
      <span className="text-sm text-doux">
        {termine ? "Ton résultat" : `Question ${etape + 1} sur ${total}`}
      </span>
    </header>
  );

  if (!termine) {
    const q = questions[etape];
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-10">
        {entete}
        <div
          className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-filet"
          role="progressbar"
          aria-valuenow={etape + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className="h-full bg-brique transition-all"
            style={{ width: `${((etape + 1) / total) * 100}%` }}
          />
        </div>

        <h1 className="mt-8 font-titre text-3xl font-extrabold leading-tight tracking-tight">
          {q.titre}
        </h1>
        {q.aide && <p className="mt-2 text-doux">{q.aide}</p>}

        <div className="mt-6 flex flex-col gap-3">
          {q.options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => choisir(q, o)}
              className="min-h-14 w-full rounded-md border border-filet px-4 py-3 text-left text-lg font-semibold active:border-brique active:bg-brique/10"
            >
              {o.label}
            </button>
          ))}
        </div>

        {etape > 0 && (
          <button
            type="button"
            onClick={() => setEtape(etape - 1)}
            className="mt-6 self-start py-2 text-doux underline"
          >
            Question précédente
          </button>
        )}
      </main>
    );
  }

  // Calcul
  const commandes = reponses.commandes.valeur;
  const panier = reponses.panier.valeur;
  const paient = reponses.paient.valeur;
  const paniersAbandonnes = Math.round((commandes * (1 - paient)) / paient);
  const perdu = paniersAbandonnes * panier;
  const recupere = Math.round(perdu * TAUX_RECUPERATION);
  const fois = recupere / PRIX;
  const seuil = Math.round(PRIX / TAUX_RECUPERATION);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-10">
      {entete}

      <p className="mt-8 text-lg text-doux">
        D'après tes réponses, chaque mois, environ {paniersAbandonnes} paniers
        sont abandonnés. Cela représente :
      </p>
      <p className="mt-2 font-titre text-6xl font-extrabold leading-none text-brique">
        {euros.format(perdu)}
      </p>
      <p className="mt-2 text-lg">de ventes qui ne se sont pas faites.</p>

      <section className="mt-8 border-y border-filet py-6">
        <p className="text-lg">
          En relançant ces clients par deux emails, tu peux en récupérer
          environ 8 %, soit :
        </p>
        <p className="mt-2 font-titre text-5xl font-extrabold leading-none">
          {euros.format(recupere)}
          <span className="text-2xl font-bold text-doux"> par mois</span>
        </p>
        <p className="mt-3 text-sm text-doux">
          8 % est une hypothèse prudente, pas une promesse. Le résultat dépend
          de ta boutique et de tes produits.
        </p>
      </section>

      {recupere >= PRIX ? (
        <p className="mt-6 text-lg leading-snug">
          Panier Perdu coûte {PRIX} €/mois. D'après tes chiffres, il pourrait
          te rapporter{" "}
          <strong>
            {fois >= 10 ? Math.round(fois) : fois.toFixed(1).replace(".", ",")}{" "}
            fois son prix
          </strong>
          .
        </p>
      ) : (
        <p className="mt-6 text-lg leading-snug">
          Franchement : à ton volume actuel, Panier Perdu ({PRIX} €/mois)
          aurait du mal à se rentabiliser. Il devient intéressant à partir
          d'environ {euros.format(seuil)} de paniers perdus par mois.
        </p>
      )}

      <Link
        href="/compte"
        className="mt-8 flex h-14 w-full items-center justify-center rounded-md bg-brique text-lg font-bold text-white active:opacity-90"
      >
        Voir ma première relance
      </Link>
      <p className="mt-3 text-center text-sm text-doux">
        Gratuit. Il te faudra juste un email pour la suite.
      </p>

      <button
        type="button"
        onClick={recommencer}
        className="mt-6 self-center py-2 text-doux underline"
      >
        Refaire le questionnaire
      </button>
    </main>
  );
}
