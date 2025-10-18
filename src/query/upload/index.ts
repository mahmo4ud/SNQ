import { api } from "@/lib/axios";

export const uploadImage = async (file: File) => {
  try {
    const form = new FormData();
    form.append("image", file);

    const res = await api.post("/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const url: string | undefined = res?.data?.url;
    return {
      success: true as const,
      url,
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const resp = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn: resp?.messageEn ?? "Upload failed",
      messageAr: resp?.messageAr ?? "فشل الرفع",
    };
  }
};
