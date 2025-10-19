import { api } from "@/lib/axios";

export type NewsDetail = {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
  user?: { firstName?: string; lastName?: string };
};

export const getOneNew = async (id: string) => {
  try {
    const res = await api.get("/new/get-one-new", { params: { id } });
    return {
      success: true as const,
      data: (res?.data?.data ?? null) as NewsDetail | null,
      messageEn: res?.data?.messageEn ?? "News fetched successfully",
      messageAr: res?.data?.messageAr ?? "تم جلب الخبر بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to fetch news",
      messageAr: resp?.messageAr ?? "فشل في جلب الخبر",
    };
  }
};
