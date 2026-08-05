import { cookies } from "next/headers";
import api from "../layout/apiClient";
import { Prototype } from "@/types/prototype/prototype";
import { cacheLife, cacheTag } from "next/cache";

export type UserInfo = {
  id?: number;
  name?: string;
};

export async function prototypeList(): Promise<Prototype[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("prototype-list");
  try {
    const response = await api.get<Prototype[]>(
      "/prototypes/",
      /**
       * , {
      params: {
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    }
       */
    );
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
    console.error("ユーザー情報取得エラー", error);
    return {};
  }
}
