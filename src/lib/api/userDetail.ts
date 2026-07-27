import axios from "axios";
import api from "./apiClient";
import { UserDetailType } from "@/types/UserDetailType";

// ユーザー詳細
export const userDetail = async (
  id: number,
): Promise<UserDetailType | { error: string }> => {
  try {
    const responseUserInfo = await api.get(`users/${id}`);
    const responsePrototypeList = await api.get(`prototype/users/${id}`);
    console.log("response data : ", responseUserInfo.data);
    console.log("responsePrototypeList : ", responsePrototypeList.data);
    const response = {
      responseUserInfo: responseUserInfo.data,
      responsePrototypeList: responsePrototypeList.data,
    };
    return response;
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
