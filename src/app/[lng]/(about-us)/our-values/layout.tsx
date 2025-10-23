import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "قيمنا",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
