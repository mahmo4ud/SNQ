import { api } from "@/lib/axios";

export const deleteNew = async (id: string) => {
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

    const res = await api.delete("/new/delete-new", { params: { id }, headers });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "News deleted successfully",
      messageAr: res?.data?.messageAr ?? "تم حذف الخبر بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to delete news",
      messageAr: resp?.messageAr ?? "فشل حذف الخبر",
    };
  }
};
