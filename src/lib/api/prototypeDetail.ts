import api from "./apiClient";
import { Prototype } from "@/types/prototype";
import { cacheLife } from "next/cache";
import { redirect } from "next/navigation";

// プロトタイプ詳細
export async function prototypeDetail(id: number): Promise<Prototype> {
  "use cache";
  cacheLife("hours");
  try {
    const response = await api.get<Prototype>(`prototypes/${id}`);

    return response.data;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    // ここredirectじゃなくてerrorをページに返すようにした方がいいかも
    redirect("/");
  }
}
