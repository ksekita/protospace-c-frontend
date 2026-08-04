"use server";
import { redirect } from "next/navigation";
import api from "./apiClient";
import axios from "axios";
import { cookies } from "next/headers";

// エラー時に、入力した内容をそのまま画面に返すための記述
export type EditUserState = {
  id?: string;
  name?: string;
  profile?: string;
  affiliation?: string;
  position?: string;
  error?: string;
  fieldErrors?: {
    name?: string;
    profile?: string;
    affiliation?: string;
    position?: string;
  };
};

export async function editUser(
  prevState: EditUserState | null,
  formData: FormData,
): Promise<EditUserState> {
  // フォームの入力内容を取得
  const id = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const profile = formData.get("profile") as string;
  const affiliation = formData.get("affiliation") as string;
  const position = formData.get("position") as string;

  const currentState: EditUserState = {
    id,
    name,
    profile,
    affiliation,
    position,
  };

  if (!name || !profile || !affiliation || !position) {
    return {
      ...currentState,
      error: "未入力の項目があります",
      fieldErrors: {
        name: !name ? "名前を入力してください" : undefined,
        profile: !profile ? "プロフィールを入力してください" : undefined,
        affiliation: !affiliation ? "所属を入力してください" : undefined,
        position: !position ? "役職を入力してください" : undefined,
      },
    };
  }

  const sendData = {
    name,
    profile,
    affiliation,
    position,
  };

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    await api.put(`/users/${id}`, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ...currentState,
        error: error.response.data.message || "更新に失敗しました",
      };
    }
    return { ...currentState, error: "通信エラーが発生しました" };
  }

  redirect(`/users/${id}/`);
}
