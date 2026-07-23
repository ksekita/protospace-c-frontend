// verifyTokenの共通化
export function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return false;
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}
