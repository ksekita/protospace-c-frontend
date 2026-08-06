"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import api from "../api/layout/apiClient";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

export type RegisterPrototypeState = {
  title?: string;
  catchCopy?: string;
  concept?: string;
  image?: File;
  error?: string;
  fieldErrors?: {
    title?: string;
    catchCopy?: string;
    concept?: string;
    image?: string;
  };
};
// 新規投稿
export async function CreatePrototypeAction(
  prevState: RegisterPrototypeState | null,
  formData: FormData,
): Promise<RegisterPrototypeState> {
  // フォームに入力されたデータを取得↓
  const title = formData.get("title") as string;
  const catchCopy = formData.get("catchCopy") as string;
  const concept = formData.get("concept") as string;
  const image = formData.get("image") as File;

  const currentState: RegisterPrototypeState = {
    title,
    catchCopy,
    concept,
    image,
  };

  if (!title || !catchCopy || !concept || !image) {
    return {
      ...currentState,
      error: "未入力の項目があります",
      fieldErrors: {
        title: !title ? "タイトルを入力してください" : undefined,
        catchCopy: !catchCopy ? "キャッチコピーを入力してください" : undefined,
        concept: !concept ? "コンセプトを入力してください" : undefined,
        image: !image ? "画像を入力してください" : undefined,
      },
    };
  }

  // titleの文字数チェック
  if (title.length > 50) {
    return {
      ...currentState,
      error: "タイトルの文字数オーバー",
      fieldErrors: {
        title: "タイトルは50文字以内で入力してください",
      },
    };
  }

  // catchCopyの文字数チェック
  if (catchCopy.length > 50) {
    return {
      ...currentState,
      error: "キャッチコピーの文字数オーバー",
      fieldErrors: {
        catchCopy: "キャッチコピーは50文字以内で入力してください",
      },
    };
  }

  // conceptの文字数チェック
  if (concept.length > 1000) {
    return {
      ...currentState,
      error: "コンセプトの文字数オーバー",
      fieldErrors: {
        concept: "コンセプトは1000文字以内で入力してください",
      },
    };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    await api.post("prototypes/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    updateTag("prototype-list");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("🔥 バックエンドからのエラー詳細:", error.response.data);
      console.error("🔥 ステータスコード:", error.response.status);
      return {
        ...currentState,
        error: error.response.data.message || "投稿に失敗しました",
      };
    }
    console.error("error", error);
    return { ...currentState, error: "通信エラーが発生しました" };
  }
  redirect("/");
}
