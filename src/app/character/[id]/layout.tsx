"use client";
import { FavoritesProvider } from "src/contexts/FavoritesContext";

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
