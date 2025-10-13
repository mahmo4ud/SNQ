"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "./i18next";
import { GetTOptions } from ".";

const runsOnServerSide = typeof window === "undefined";

export function useT(ns?: string | readonly string[], options?: GetTOptions) {
  const lng = useParams()?.lng;
  if (typeof lng !== "string")
    throw new Error("useT is only available inside /app/[lng]");
  if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng);
  } else {
    // eslint-disable-next-line
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);
    // eslint-disable-next-line
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return;
      setActiveLng(i18next.resolvedLanguage);
      // eslint-disable-next-line
    }, [activeLng, i18next.resolvedLanguage]);
    // eslint-disable-next-line
    useEffect(() => {
      if (!lng || i18next.resolvedLanguage === lng) return;
      i18next.changeLanguage(lng);
      // eslint-disable-next-line
    }, [lng, i18next]);
  }
  return useTranslation(ns, options);
}