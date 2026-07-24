import axios from "axios";
import api from "./apiClient";
import { UserDetailResponse } from "@/types/UserDetailResponse";

// ユーザー詳細
export const userDetail = async (
  userId: number,
): Promise<UserDetailResponse | { error: string }> => {
  try {
    const response = await api.get(`users/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: "表示できませんでした",
      };
    }
    return { error: "通信エラーが発生しました" };
  }
};
