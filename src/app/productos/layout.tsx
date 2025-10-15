import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos | EXO digital studio",
  description: "Descubre nuestros productos digitales y soluciones innovadoras.",
};

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}