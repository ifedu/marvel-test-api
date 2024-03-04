import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const roboto = Roboto_Condensed({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Marvel App",
  description: "API Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header></header>
        <div className={styles.container}>{children}</div>
        <footer></footer>
      </body>
    </html>
  );
}
