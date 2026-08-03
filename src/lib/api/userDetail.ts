import axios from "axios";
import api from "./apiClient";
import {
  ResponseUserInfo,
  ResponsePrototypeList,
} from "@/types/UserDetailType";
import { cacheLife } from "next/cache";

// ユーザー詳細
export async function userDetailInfo(id: number): Promise<ResponseUserInfo> {
  "use cache";

  try {
    const response = await api.get(`users/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: "表示できませんでした",
      };
    }
    return { error: "通信エラーが発生しました" };
  }
}

// ユーザー詳細投稿詳細
export async function userDetailProto(
  id: number,
): Promise<ResponsePrototypeList[]> {
  "use cache";
  cacheLife("seconds");
  try {
    const response = await api.get(`prototypes/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return [error || "表示できませんでした"];
    }
    return [error || "通信エラーが発生しました"];
  }
}
