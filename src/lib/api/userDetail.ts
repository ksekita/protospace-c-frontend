import axios from "axios";
import api from "./apiClient";
import { UserDetailType } from "@/types/UserDetailType";

// ユーザー詳細
export const userDetailInfo = async (
  id: number,
): Promise<UserDetailType | { error: string }> => {
  try {
    const [responseUserInfo, responsePrototypeList] = await Promise.all([
      api.get(`users/${id}`),
      api.get(`prototypes/users/${id}`),
    ]);
    const response = {
      responseUserInfo: responseUserInfo.data,
      responsePrototypeList: responsePrototypeList.data,
    };

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: "表示できませんでした",
      };
    }
    return { error: "通信エラーが発生しました" };
  }
};
