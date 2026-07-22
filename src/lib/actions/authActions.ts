"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";
import api from "../api/apiClient";
import { createSession } from "./sessionActions";

export type LoginActionState = {
  email?: string;
  error?: string;
};

export type RegisterActionState = {
  email?: string;
  username?: string;
  profile?: string;
  affiliation?: string;
  position?: string;
  error?: string;
  fieldErrors?: {
    username?: string;
    email?: string;
    password?: string;
    profile?: string;
    affiliation?: string;
    position?: string;
  };
};

// ログイン
export async function loginAction(
  prevState: LoginActionState | null,
  formData: FormData,
): Promise<LoginActionState> {
  //  emailとpasswordを取得
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await api.post("auth/login", { email, password });
    await createSession(response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        email,
        error:
          error.response.data.message ||
          "メールアドレスまたはパスワードが違います",
      };
    }
    console.log("error", error);
    return { email, error: "通信エラーが発生しました" };
  }
  redirect("/");
}

export async function registerAction(
  prevState: RegisterActionState | null,
  formData: FormData,
): Promise<RegisterActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;
  const username = formData.get("username") as string;
  const profile = formData.get("profile") as string;
  const affiliation = formData.get("affiliation") as string;
  const position = formData.get("position") as string;

  // データを保存するもの
  const currentState: RegisterActionState = {
    email,
    username,
    profile,
    affiliation,
    position,
  };

  // 入力内容チェック
  if (
    !username ||
    !profile ||
    !affiliation ||
    !position ||
    !email ||
    !password
  ) {
    return {
      ...currentState,
      error: "入力内容に不備があります",
      fieldErrors: {
        username: !username ? "ユーザー名を入力してください" : undefined,
        email: !email ? "メールアドレスを入力してください" : undefined,
        password: !password ? "パスワードを入力してください" : undefined,
        profile: !profile ? "プロフィールを入力してください" : undefined,
        affiliation: !affiliation ? "所属を入力してください" : undefined,
        position: !position ? "役職を入力してください" : undefined,
      },
    };
  }

  // パスワードチェック
  if (password !== password_confirmation)
    return {
      ...currentState,
      error: "パスワードが一致しません",
      fieldErrors: { password: "確認用パスワードと一致しません" },
    };

  try {
    const passwordConfirm = password_confirmation;

    const response = await api.post("auth/register", {
      username,
      email,
      password,
      passwordConfirm,
      position,
      affiliation,
    });
    await createSession(response.data.token);
  } catch (error) {
    console.log("error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        ...currentState,
        error: error.response.data.message || "登録できませんでした",
      };
    }
    return {
      ...currentState,
      error: "通信エラーが発生しました",
    };
  }
  redirect("/");
}

// ログアウト token削除
export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("jwt_token");

  redirect("/auth/login");
}
