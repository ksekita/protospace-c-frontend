"use server";

import { cookies } from "next/headers";
import axios from "axios";
import api from "../api/apiClient";
import { revalidatePath } from "next/cache";

export type CommentActionState = {
  id: number;
  content?: string;
  error?: string;
};

export async function commentAction(
  id: number, // bind された引数
  prevState: CommentActionState | null, // 第2引数を prevState にする
  formData: FormData, // 第3引数に formData を持ってくる
): Promise<CommentActionState> {
  const content = formData.get("content") as string;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    const response = await api.post(
      `prototypes/${id}/comments`,
      //   第二引数にrequest body
      { content },
      //   第三引数にheader
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath(`/prototype/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        id,
        content,
        error: error.response.data.message || "コメントできませんでした",
      };
    }
    return { id, content, error: "通信エラーが発生しました" };
  }
}
// コメント削除
export async function commentDelete(id: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    await api.delete(`comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("コメント削除に失敗しました:", error);
  }
}
