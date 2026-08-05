import { cookies } from "next/headers";
import api from "./apiClient";
import { Prototype } from "@/types/prototype";
import { keyboard } from "@testing-library/user-event/dist/cjs/keyboard/index.js";

export type UserInfo = {
  id?: number;
  name?: string;
};

export async function prototypeList(
  keyword?: string,
  sort?: string,
): Promise<Prototype[]> {
  try {
    // APIからプロトタイプの一覧情報を取得する
    const response = await api.get<Prototype[]>("/prototypes/", {
      params: {
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    return [];
  }
}

export async function userInfo(): Promise<UserInfo> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    const response = await api.get<UserInfo>("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return {};
  }
}
