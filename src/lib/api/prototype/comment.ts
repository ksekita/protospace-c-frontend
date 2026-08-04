import { CommentListType } from "@/types/CommentListType";
import api from "../layout/apiClient";
import { cacheLife } from "next/cache";

// コメント一覧
export async function allCommentList(
  id: number,
): Promise<CommentListType[] | null> {
  "use cache";
  cacheLife("seconds");
  try {
    const response = await api.get<CommentListType[]>(
      `prototypes/${id}/comments`,
    );
    return response.data;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    return null;
  }
}
