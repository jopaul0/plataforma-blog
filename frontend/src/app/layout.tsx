import { DM_Sans, Amita, Shadows_Into_Light } from 'next/font/google'
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

const amita = Amita({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-amita'
})

const tagFont = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tag-alt'
})

export const metadata: Metadata = {
  title: {
    default: "Portal Lux",
    template: "%s | Portal Lux",
  },
  description:
    "Crie seu próprio blog, compartilhe ideias e descubra artigos em destaque na comunidade do Portal Lux.",

  keywords: [
    "blog",
    "plataforma de blogs",
    "criar blog",
    "artigos",
    "conteúdo",
    "comunidade",
  ],

  authors: [{ name: "Portal Lux" }],

  creator: "Portal Lux",
  publisher: "Portal Lux",

  openGraph: {
    title: "Portal Lux",
    description:
      "Uma plataforma para criar seu blog, compartilhar experiências e explorar conteúdos em destaque.",
    // url: "https://portal-lux.vercel.app", // depois você troca
    siteName: "Portal Lux",
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portal Lux",
    description:
      "Crie, compartilhe e descubra conteúdos na comunidade Portal Lux.",
  },

  // metadataBase: new URL("https://portal-lux.vercel.app"), // depois troca pro domínio real
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${dmSans.variable} ${amita.variable} ${tagFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
