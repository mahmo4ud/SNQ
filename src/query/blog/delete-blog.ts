import { api } from "@/lib/axios";

export const deleteBlog = async (id: string) => {
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

    const res = await api.delete("/blog/delete-blog", {
      params: { id },
      headers,
    });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Blog deleted successfully",
      messageAr: res?.data?.messageAr ?? "تم حذف المقال بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to delete blog",
      messageAr: resp?.messageAr ?? "فشل حذف المقال",
    };
  }
};
