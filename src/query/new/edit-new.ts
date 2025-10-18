import { api } from "@/lib/axios";

export type EditNewsInput = Partial<{
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl: string;
}>;

export const editNew = async (id: string, data: EditNewsInput) => {
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

    const res = await api.patch("/new/edit-new", data, { params: { id }, headers });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "News updated successfully",
      messageAr: res?.data?.messageAr ?? "تم تعديل الخبر بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to update news",
      messageAr: resp?.messageAr ?? "فشل تعديل الخبر",
    };
  }
};
