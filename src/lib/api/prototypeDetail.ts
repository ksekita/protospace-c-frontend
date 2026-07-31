import api from "./apiClient";
import { Prototype } from "@/types/prototype";
import { UserInfo } from "./useGetPrototype";
import { cookies } from "next/headers";
import { isTokenValid } from "@/lib/utils/auth";
import { PrototypeDetailType } from "@/types/PrototypeDetailType";
import { redirect } from "next/navigation";

export async function prototypeDetail(
  id: number,
): Promise<PrototypeDetailType> {
  // コメントフォーム表示
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  const isLoggedIn = await isTokenValid(token);

  try {
    // const response = await api.get<Prototype>(`prototypes/${id}`);
    const [responsePrototypeDetail, responseUserInfo, isLoginCheck] =
      await Promise.all([
        // 投稿詳細
        await api.get<Prototype>(`prototypes/${id}`),
        // ユーザー情報(id,name) バックエンドでuserIdだけとれるのを書ければもっといい
        await api.get<UserInfo>("/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        isLoggedIn,
      ]);

    const response = {
      responsePrototypeDetail: responsePrototypeDetail.data,
      responseUserInfo: responseUserInfo.data,
      isLoginCheck: isLoginCheck,
    };

    return response;
  } catch (error) {
    console.error("一覧情報の取得に失敗しました:", error);
    // ここredirectじゃなくてerrorをページに返すようにした方がいいかも
    redirect("/");
  }
}
