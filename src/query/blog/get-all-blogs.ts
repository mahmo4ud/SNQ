import { api } from "@/lib/axios";

export type BlogListItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  createdAt: string;
  updatedAt?: string;
  user?: { firstName?: string; lastName?: string };
};

export const getAllBlogs = async () => {
  try {
    const res = await api.get("blog/get-blogs");
    return {
      success: true as const,
      data: (res?.data?.data ?? []) as BlogListItem[],
      messageEn: res?.data?.messageEn ?? "Blogs fetched successfully",
      messageAr: res?.data?.messageAr ?? "تم جلب المقالات بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to fetch blogs",
      messageAr: resp?.messageAr ?? "فشل في جلب المقالات",
    };
  }
};
