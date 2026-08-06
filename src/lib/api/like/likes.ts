"use server";

import { cookies } from "next/headers";
import api from "../layout/apiClient";
import axios from "axios";
import { cacheTag, updateTag } from "next/cache";

interface ProtoLikeType {
  likeCount?: number;
  isLiked?: boolean;
}

// いいねボタン送信
// バックエンド側ではパスの中にあるidを受け取る(prototypeId)
// ここで引数をprototypeIdを受け取り、ログインしているユーザーであればpost
// ※ バックエンドでpostでどっちも受け取ってるから削除もここでやる
export async function likeBtnPost(prototypeId: number) {
  // ログインしているかどうかtokenを取り出す
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  try {
    const response = await api.post<ProtoLikeType>(
      `prototypes/${prototypeId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    updateTag(`like-${prototypeId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("いいねエラーログ", error);
    }
  }
}

// いいね数取得
// prototypeIdを取得
export async function likeAllCount(
  prototypeId: number,
): Promise<ProtoLikeType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  console.log("プロｔId", prototypeId);
  try {
    const response = await api.get<ProtoLikeType>(
      `/prototypes/${prototypeId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("いいね結果", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("いいねエラーログ", error);
    }
    console.error("いいねエラーログ", error);
    return {};
  }
}
