import { api } from "@/lib/axios";

export type BlogDetail = {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  createdAt: string;
  updatedAt?: string;
  user?: { firstName?: string; lastName?: string };
};

export const getOneBlog = async (id: string) => {
  try {
    const res = await api.get("/blog/get-one-blog", { params: { id } });
    return {
      success: true as const,
      data: (res?.data?.data ?? null) as BlogDetail | null,
      messageEn: res?.data?.messageEn ?? "Blog fetched successfully",
      messageAr: res?.data?.messageAr ?? "تم جلب المقال بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to fetch blog",
      messageAr: resp?.messageAr ?? "فشل في جلب المقال",
    };
  }
};
