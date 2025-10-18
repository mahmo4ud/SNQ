import { api } from "@/lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    const token: string | undefined = res?.data?.token;

    if (typeof window !== "undefined" && token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Login successful",
      messageAr: res?.data?.messageAr ?? "تم تسجيل الدخول بنجاح",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const data = err?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn:
        data?.messageEn ??
        (status === 401 ? "Invalid credentials" : "Login failed"),
      messageAr:
        data?.messageAr ??
        (status === 401 ? "البيانات المدخلة غير صحيحة" : "فشل تسجيل الدخول"),
    };
  }
};
