"use server";

import { cookies } from "next/headers";
import api from "./apiClient";

export type Prototype = {
  id: number;
  title: string;
  catchCopy: string;
  concept: string;
  image?: string;
  userId?: number;
  name?: string;
};

export type UserInfo = {
  id?: number;
  name?: string;
};

export async function useGetPrototypes(): Promise<Prototype[]> {
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
    console.log(
      "data:===========================================================\n",
      response,
    );
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return {};
  }
}
