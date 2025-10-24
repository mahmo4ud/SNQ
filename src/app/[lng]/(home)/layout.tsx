import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "شركة سعيد بن ناصر بن قراد للمحاماة والاستشارات القانونية",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
