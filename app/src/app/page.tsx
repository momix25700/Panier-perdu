import Link from "next/link";

const benefices = [
  {
    t: "Deux relances écrites pour toi",
    d: "Une première relance, puis une seconde quelques jours après. Chaque email reprend le nom du client et les produits de son panier.",
  },
  {
    t: "Un code promo, seulement si tu veux",
    d: "Tu peux ajouter une réduction sur la seconde relance. Sinon, elle part sans.",
  },
  {
    t: "Un compteur en euros",
    d: "Tu vois combien de chiffre d'affaires les relances ont ramené. Pas de graphique compliqué.",
  },
];

export default function Accueil() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-10">
      <header className="flex items-center justify-between border-b border-filet py-4">
        <span className="font-titre text-lg font-extrabold tracking-tight">
          Panier Perdu
        </span>
        <span className="text-sm text-doux">29 €/mois</span>
      </header>

      <section className="pt-10">
        <h1 className="font-titre text-[2.5rem] font-extrabold leading-[1.05] tracking-tight">
          Combien de ventes perds-tu chaque mois&nbsp;?
        </h1>
        <p className="mt-5 text-lg leading-snug text-doux">
          Des clients remplissent leur panier, puis partent sans payer. Panier
          Perdu leur écrit à ta place, et te montre ce que ça rapporte.
        </p>
        <Link
          href="/questionnaire"
          className="mt-8 flex h-14 w-full items-center justify-center rounded-md bg-brique text-lg font-bold text-white active:opacity-90"
        >
          Commencer
        </Link>
        <p className="mt-3 text-center text-sm text-doux">
          Gratuit, 2 minutes, sans créer de compte.
        </p>
      </section>

      <section className="mt-12 border-y border-filet py-8">
        <p className="font-titre text-6xl font-extrabold leading-none text-brique">
          ≈ 70 %
        </p>
        <p className="mt-3 text-lg leading-snug">
          des paniers en ligne sont abandonnés avant le paiement.
        </p>
        <p className="mt-2 text-sm text-doux">
          Moyenne sur de nombreuses études, source : Baymard Institute.
        </p>
        <p className="mt-4 text-lg leading-snug">
          Les grosses solutions de relance sont pensées pour de gros volumes.
          Les petites boutiques, elles, ne relancent rien.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-titre text-2xl font-bold tracking-tight">
          Ce que tu obtiens
        </h2>
        <ul className="mt-5 divide-y divide-filet border-y border-filet">
          {benefices.map((b, i) => (
            <li key={b.t} className="flex gap-4 py-5">
              <span className="font-titre text-2xl font-extrabold text-brique">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug">{b.t}</h3>
                <p className="mt-1 leading-snug text-doux">{b.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-md border border-dashed border-filet p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-doux">
          Preuve sociale
        </p>
        <p className="mt-2 leading-snug text-doux">
          [EMPLACEMENT RÉSERVÉ : témoignage d'une vraie boutique, avec son
          nom et son accord. À remplir après tes premiers clients.]
        </p>
      </section>

      <section className="mt-10">
        <p className="font-titre text-2xl font-bold leading-tight tracking-tight">
          29 €/mois par boutique. Relances illimitées. Sans engagement.
        </p>
        <Link
          href="/questionnaire"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-brique text-lg font-bold text-white active:opacity-90"
        >
          Commencer
        </Link>
      </section>

      <footer className="mt-12 border-t border-filet pt-6 text-sm text-doux">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </nav>
      </footer>
    </main>
  );
}
