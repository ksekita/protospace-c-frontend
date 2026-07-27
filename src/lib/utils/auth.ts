import { jwtVerify } from "jose";

// verifyTokenの共通化
export async function isTokenValid(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
