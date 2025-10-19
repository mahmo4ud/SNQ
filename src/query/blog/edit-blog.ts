import { api } from "@/lib/axios";

export type EditBlogInput = Partial<{
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}>;

export const editBlog = async (id: string, data: EditBlogInput) => {
  try {
    let headers: Record<string, string> = {};
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        return {
          success: false as const,
          status: 401,
          messageEn: "Not authenticated",
          messageAr: "غير مصرح بالدخول",
        };
      }
      headers = { Authorization: `Bearer ${token}` };
    }

    const res = await api.patch("/blog/edit-blog", data, {
      params: { id },
      headers,
    });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Blog updated successfully",
      messageAr: res?.data?.messageAr ?? "تم تعديل المقال بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to update blog",
      messageAr: resp?.messageAr ?? "فشل تعديل المقال",
    };
  }
};
