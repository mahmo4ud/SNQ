import { api } from "@/lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    const token: string | undefined = res?.data?.token;

    if (typeof window !== "undefined" && token) {
      localStorage.setItem("adminToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return {
      success: true as const,
      messageEn: res?.data?.messageEn ?? "Login successful",
      messageAr: res?.data?.messageAr ?? "تم تسجيل الدخول بنجاح",
    };
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: Record<string, unknown> } };
    const status = error?.response?.status;
    const data = error?.response?.data ?? {};
    return {
      success: false as const,
      status,
      messageEn:
        (data?.messageEn as string) ??
        (status === 401 ? "Invalid credentials" : "Login failed"),
      messageAr:
        (data?.messageAr as string) ??
        (status === 401 ? "البيانات المدخلة غير صحيحة" : "فشل تسجيل الدخول"),
    };
  }
};
