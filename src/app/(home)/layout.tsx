"use client";
import { FavoritesProvider } from "src/contexts/FavoritesContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
