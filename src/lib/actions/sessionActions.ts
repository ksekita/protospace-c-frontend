import "server-only";
import { cookies } from "next/headers";

export async function createSession(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("jwt_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 本番(https)ならtrueになる
    sameSite: "lax",
    path: "/",
  });
}
