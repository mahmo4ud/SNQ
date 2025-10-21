import { api } from "@/lib/axios";

export type NewsListItem = {
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

export const getAllNews = async () => {
  try {
    const res = await api.get("new/get-news");
    return {
      success: true as const,
      data: (res?.data?.data ?? []) as NewsListItem[],
      messageEn: res?.data?.messageEn ?? "News fetched successfully",
      messageAr: res?.data?.messageAr ?? "تم جلب الأخبار بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to fetch news",
      messageAr: resp?.messageAr ?? "فشل في جلب الأخبار",
    };
  }
};
