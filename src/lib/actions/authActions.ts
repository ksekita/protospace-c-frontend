"use server";

import { redirect } from "next/navigation";
// import api from "../api/apiClient";
import { cookies } from "next/headers";

/**
 * backendに送るもの
 *
 * [login]
 *  email
 *  password
 *
 * [register]
 *  email
 *  password
 *  password-confirmation
 *  username
 *  profile
 *  affiliation
 *  position
 *
 * backendから返ってくるもの
 *
 * [login]
 *  email
 *
 * [register]
 *  email
 *  username
 *  profile
 *  affiliation
 *  position
 */

const mockData = {
  email: "user@example.com",
  password: "password",
};

export async function loginAction(prevState: null, formData: FormData) {
  //  emailとpasswordを取得
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // const response = await api.post("/auth/login", { email, password });
    // await createSession

    if (email === mockData.email && password === mockData.password) {
      const cookieStore = await cookies();
      cookieStore.set("session_token", "dummy-jwt-token-abc123", {
        httpOnly: true,
      });
    } else {
      return { error: "メールアドレスまたはパスワードが違います" };
    }
  } catch (error) {
    console.log("error", error);
    return { error: "通信エラーが発生しました" };
  }
  redirect("/");
}
