import { api } from "@/lib/axios";

export const deleteNew = async (id: string) => {
  try {
    let headers: Record<string, string> = {};
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
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

    const res = await api.delete("new/delete-new", { params: { id }, headers });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "News deleted successfully",
      messageAr: res?.data?.messageAr ?? "تم حذف الخبر بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to delete news",
      messageAr: resp?.messageAr ?? "فشل حذف الخبر",
    };
  }
};
