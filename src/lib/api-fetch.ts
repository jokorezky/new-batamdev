import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
type RequestBody = Record<string, unknown> | FormData | null | undefined;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: RequestBody;
  cache?: RequestCache;
};

type ApiResponse<T> = {
  data: T | null;
  message: string;
  success: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, body, cache = "no-store" } = options;

  const token = Cookies.get("token");
  const isFormData = body instanceof FormData;

  const finalHeaders: HeadersInit = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      cache,
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        message: json?.message || `API error ${response.status}`,
        success: false,
      };
    }

    return {
      data: json?.data ?? json,
      message: json?.message || "Success",
      success: true,
    };
  } catch (error: unknown) {
    let errorMessage = "Unexpected error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      data: null,
      message: errorMessage,
      success: false,
    };
  }
}
