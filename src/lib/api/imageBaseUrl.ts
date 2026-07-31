const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
export const imageBaseUrl = new URL(backendUrl).origin;
