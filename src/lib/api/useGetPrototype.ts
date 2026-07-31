import { cookies } from "next/headers";
import api from "./apiClient";
import { Prototype } from "@/types/prototype";

export type UserInfo = {
  id?: number;
  name?: string;
};

export async function prototypeList(): Promise<Prototype[]> {
  try {
    const response = await api.get<Prototype[]>("/prototypes/");

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
