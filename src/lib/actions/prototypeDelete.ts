"use server";
import { redirect } from "next/navigation";
import api from "../api/layout/apiClient";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

export async function prototypeDelete(id: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    await api.delete(`prototypes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    updateTag(`prototype-${id}`);
    updateTag("prototype-list");
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
  }
  redirect("/");
}
