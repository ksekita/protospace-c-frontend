import { jwtVerify } from "jose";
import { cookies } from "next/headers";

// verifyTokenの共通化
export async function isTokenValid(): Promise<boolean> {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt_token")?.value;

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
