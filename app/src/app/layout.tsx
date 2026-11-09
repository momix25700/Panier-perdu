import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const titre = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["700", "800"],
  display: "swap",
});
const corps = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

const description =
  "Panier Perdu relance par email les clients qui ont abandonné leur panier. 29 €/mois, relances illimitées, sans engagement.";

export const metadata: Metadata = {
  metadataBase: new URL("https://panier-perdu-xi-lovat.vercel.app"),
  title: "Panier Perdu : combien de ventes perds-tu chaque mois ?",
  description,
  openGraph: {
    title: "Combien de ventes perds-tu chaque mois ?",
    description,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#14213d" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titre.variable} ${corps.variable}`}>
      <body>{children}</body>
    </html>
  );
}
