"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import api from "./apiClient";

// エラー時に、入力した内容をそのまま画面に返すための記述
export type EditPrototypeState = {
  id?: string;
  title?: string;
  catchCopy?: string;
  concept?: string;
  image?: string;
  error?: string;
  fieldErrors?: {
    title?: string;
    catchCopy?: string;
    concept?: string;
  };
};

export async function EditPrototypeAction(
  prevState: EditPrototypeState | null,
  formData: FormData,
): Promise<EditPrototypeState> {
  // フォームの入力内容を取得
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const catchCopy = formData.get("catchCopy") as string;
  const concept = formData.get("concept") as string;
  const image = formData.get("image") as string;

  const currentState: EditPrototypeState = {
    id,
    title,
    catchCopy,
    concept,
    image,
  };

  if (!title || !catchCopy || !concept) {
    return {
      ...currentState,
      error: "未入力の項目があります",
      fieldErrors: {
        title: !title ? "タイトルを入力してください" : undefined,
        catchCopy: !catchCopy ? "キャッチコピーを入力してください" : undefined,
        concept: !concept ? "コンセプトを入力してください" : undefined,
      },
    };
  }

  try {
    await api.post(`prototypes/${id}/edit`, {
      title,
      catchCopy,
      concept,
      image,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ...currentState,
        error: error.response.data.message || "更新に失敗しました",
      };
    }
    console.log("error,error");
    return { ...currentState, error: "通信エラーが発生しました" };
  }
  redirect("/");
}
