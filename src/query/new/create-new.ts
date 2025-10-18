import { api } from "@/lib/axios";

export type CreateNewsInput = {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl: string;
};

export const createNew = async (data: CreateNewsInput) => {
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

    const res = await api.post("/new/create-new", data, { headers });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "News created successfully",
      messageAr: res?.data?.messageAr ?? "تم إنشاء الخبر بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to create news",
      messageAr: resp?.messageAr ?? "فشل إنشاء الخبر",
    };
  }
};
