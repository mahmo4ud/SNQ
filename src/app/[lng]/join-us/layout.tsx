import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "انضم إلى فريقنا",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
