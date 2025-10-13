import { i18n, Namespace, TFunction } from "i18next";
import i18next from "./i18next";
import { headers } from "next/headers";
import { headerName } from "./settings";

export interface GetTOptions {
  keyPrefix?: string;
}

export async function getT(
  ns?: Namespace | Namespace[],
  options?: GetTOptions
): Promise<{ t: TFunction; i18n: i18n }> {
  const headerList = await headers();
  const lng = headerList.get(headerName) ?? undefined;

  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }

  if (ns && !i18next.hasLoadedNamespace(ns as string | readonly string[])) {
    await i18next.loadNamespaces(ns as string | readonly string[]);
  }

  return {
    t: i18next.getFixedT(
      lng ?? i18next.resolvedLanguage!,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix
    ),
    i18n: i18next,
  };
}