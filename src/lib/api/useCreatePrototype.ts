"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import api from "./apiClient";

export type RegisterPrototypeState = {
  title?: string;
  catchCopy?: string;
  concept?: string;
  image?: string;
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
  const image = formData.get("image") as string;

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
        title: !title ? "タイトルを入力してくださいw" : undefined,
        catchCopy: !catchCopy ? "キャッチコピーを入力してくださいw" : undefined,
        concept: !concept ? "コンセプトを入力してくださいw" : undefined,
        image: !image ? "画像を入力してくださいw" : undefined,
      },
    };
  }

  try {
    await api.post("prototypes/new", {
      title,
      catchCopy,
      concept,
      image,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        title,
        catchCopy,
        concept: error.response.data.message || "未入力の欄があります",
      };
    }
    console.log("error", error);
    return { title, catchCopy, concept };
  }
  redirect("/");
}
