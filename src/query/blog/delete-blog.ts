import { api } from "@/lib/axios";

export const deleteBlog = async (id: string) => {
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

    const res = await api.delete("blog/delete-blog", {
      params: { id },
      headers,
    });

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Blog deleted successfully",
      messageAr: res?.data?.messageAr ?? "تم حذف المقال بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const resp = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Failed to delete blog",
      messageAr: resp?.messageAr ?? "فشل حذف المقال",
    };
  }
};
