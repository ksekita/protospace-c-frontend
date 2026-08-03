"use server";

import { cookies } from "next/headers";
import axios from "axios";
import api from "../api/apiClient";
import { cacheLife, revalidatePath, updateTag } from "next/cache";

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

    updateTag("prototype");
    // キャッシュをアップデート
    revalidatePath(`/prototype/${id}`);

    return { id, content: response.data.content || content, error: undefined };
  } catch (error) {
    console.log(error);
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
