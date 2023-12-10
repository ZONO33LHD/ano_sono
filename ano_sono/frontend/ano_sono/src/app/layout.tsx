import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import NextAuthProvider from "@/providers/NextAuth";

const inter = Inter({ subsets: ["latin"] });

interface MyMetadata {
  title: string;
  description: string;
}

export const metadata: MyMetadata = {
  title: "ano sono",
  description: "Generated by ano sono app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title || ""}</title>
        <meta name="description" content={metadata.description || ""} />
      </head>
      <body className={inter.className}>
        <NavBar />
        <NextAuthProvider>{children}</NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
