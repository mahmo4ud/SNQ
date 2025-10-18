import { api } from "@/lib/axios";

type CreateBlogInput = {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
};

export const createBlog = async (data: CreateBlogInput) => {
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

    const res = await api.post("/blog/create-blog", data, { headers });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Blog created successfully",
      messageAr: res?.data?.messageAr ?? "تم إنشاء المقال بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to create blog",
      messageAr: resp?.messageAr ?? "فشل إنشاء المقال",
    };
  }
};
