"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import api from "../api/layout/apiClient";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

// エラー時に、入力した内容をそのまま画面に返すための記述
export type EditPrototypeState = {
  id: number;
  title?: string;
  catchCopy?: string;
  concept?: string;
  image?: File;
  error?: string;
  fieldErrors?: {
    title?: string;
    catchCopy?: string;
    concept?: string;
  };
};

export async function editPrototypeAction(
  id: number,
  prevState: EditPrototypeState | null,
  formData: FormData,
): Promise<EditPrototypeState> {
  // フォームの入力内容を取得
  const title = formData.get("title") as string;
  const catchCopy = formData.get("catchCopy") as string;
  const concept = formData.get("concept") as string;
  const image = formData.get("image") as File;

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
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    console.log(formData);
    await api.put(`prototypes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    updateTag(`prototype-${id}`);
    updateTag("prototype-list");
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        ...currentState,
        error: error.response.data.message || "更新に失敗しました",
      };
    }
    return { ...currentState, error: "通信エラーが発生しました" };
  }
  redirect(`/prototype/${id}`);
}
