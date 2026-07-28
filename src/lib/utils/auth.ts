import { jwtVerify } from "jose";

// verifyTokenの共通化
export async function isTokenValid(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error("JWT_SECRETが設定されていません");
    return false;
  } else {
    try {
      const secret = new TextEncoder().encode(secretKey);
      await jwtVerify(token, secret);
      return true;
    } catch {
      return false;
    }
  }
}
