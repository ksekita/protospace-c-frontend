"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";
import api from "../api/layout/apiClient";
import { createSession } from "./sessionActions";

export type LoginActionState = {
  email?: string;
  error?: string;
};

export type RegisterActionState = {
  email?: string;
  name?: string;
  profile?: string;
  affiliation?: string;
  position?: string;
  error?: string;
  fieldErrors?: {
    name?: string;
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
    return { email, error: "通信エラーが発生しました" };
  }
  redirect("/");
}

// 登録
export async function registerAction(
  prevState: RegisterActionState | null,
  formData: FormData,
): Promise<RegisterActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;
  const name = formData.get("name") as string;
  const profile = formData.get("profile") as string;
  const affiliation = formData.get("affiliation") as string;
  const position = formData.get("position") as string;

  // データを保存するもの
  const currentState: RegisterActionState = {
    email,
    name,
    profile,
    affiliation,
    position,
  };

  // 入力内容チェック
  if (!name || !profile || !affiliation || !position || !email || !password) {
    return {
      ...currentState,
      error: "入力内容に不備があります",
      fieldErrors: {
        name: !name ? "ユーザー名を入力してください" : undefined,
        email: !email ? "メールアドレスを入力してください" : undefined,
        password: !password ? "パスワードを入力してください" : undefined,
        profile: !profile ? "プロフィールを入力してください" : undefined,
        affiliation: !affiliation ? "所属を入力してください" : undefined,
        position: !position ? "役職を入力してください" : undefined,
      },
    };
  }

  // name文字数チェック
  if (name.length > 50)
    return {
      ...currentState,
      error: "ユーザー名の文字数オーバー",
      fieldErrors: {
        name: "ユーザー名は50文字以内で入力してください",
      },
    };

  // email文字数チェック
  if (email.length > 255)
    return {
      ...currentState,
      error: "メールアドレスの文字数オーバー",
      fieldErrors: {
        name: "メールアドレスは255文字以内で入力してください",
      },
    };

  // パスワードチェック
  if (password !== password_confirmation)
    return {
      ...currentState,
      error: "パスワードが一致しません",
      fieldErrors: { password: "確認用パスワードと一致しません" },
    };

  // プロフィルの文字数チェック
  if (profile.length > 1000)
    return {
      ...currentState,
      error: "プロフィールの文字数オーバー",
      fieldErrors: {
        profile: "プロフィールは1000文字以内で入力してください",
      },
    };

  // 所属の文字数チェック
  if (affiliation.length > 50)
    return {
      ...currentState,
      error: "所属の文字数オーバー",
      fieldErrors: {
        affiliation: "所属は50文字以内で入力してください",
      },
    };

  // 役職の文字数チェック
  if (position.length > 50)
    return {
      ...currentState,
      error: "役職の文字数オーバー",
      fieldErrors: {
        position: "役職は50文字以内で入力してください",
      },
    };

  try {
    const response = await api.post("auth/register", {
      name,
      email,
      password,
      passwordConfirm: password_confirmation,
      profile,
      position,
      affiliation,
    });
    await createSession(response.data.token);
  } catch (error) {
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
