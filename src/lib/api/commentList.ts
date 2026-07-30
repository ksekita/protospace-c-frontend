import { CommentListType } from "@/types/CommentListType";
import api from "./apiClient";

export async function allCommentList(
  id: number,
): Promise<CommentListType[] | null> {
  try {
    const response = await api.get<CommentListType[]>(
      `prototypes/${id}/comments`,
    );
    console.log("コメントデータ : ", response.data);
    return response.data;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    return null;
  }
}
