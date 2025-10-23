import { api } from "@/lib/axios";

export const uploadImage = async (file: File) => {
  try {
    const form = new FormData();
    form.append("image", file);

    // لو api.baseURL مضبوط على الخادم الداخلي، استخدم "/api/upload" أو "upload" حسب إعدادك
    const res = await api.post("/api/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { url, publicId, success, messageEn, messageAr } = res?.data || {};

    if (success) {
      return { success: true as const, url, publicId };
    } else {
      return { success: false as const, messageEn: messageEn ?? "Upload failed", messageAr: messageAr ?? "فشل الرفع" };
    }
  } catch (err: any) {
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status: err?.response?.status,
      messageEn: resp?.messageEn ?? "Upload failed",
      messageAr: resp?.messageAr ?? "فشل الرفع",
    };
  }
};
