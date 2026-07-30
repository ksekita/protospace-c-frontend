import { redirect } from "next/navigation";
import api from "./apiClient";
import { Prototype } from "@/types/prototype";

export async function prototypeDetail(id: number): Promise<Prototype> {
  try {
    const response = await api.get<Prototype>(`prototypes/${id}`);
    return response.data;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    redirect("/");
  }
}
