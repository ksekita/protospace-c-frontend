import { EditPrototype, Prototype } from "@/types/prototype/prototype";
import api from "../layout/apiClient";
import { UserInfo } from "../prototype-list/useGetPrototype";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

interface EditPrototypeData {
  editPrototype?: EditPrototype;
  prototypeUserId?: number;
  userId?: number;
}

export async function prototypeEdit(
  prototypeId: number,
): Promise<EditPrototypeData> {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  try {
    const [initialData, responsePrototype, userInfo] = await Promise.all([
      await api.get<EditPrototype>(`prototypes/${prototypeId}`),
      await api.get<Prototype>(`prototypes/${prototypeId}`),
      await api.get<UserInfo>("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    return {
      editPrototype: initialData.data,
      prototypeUserId: responsePrototype.data.userId,
      userId: userInfo.data.id,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("エラーログ", error.response);
    }
  }
  return redirect(`/prototype/${prototypeId}`);
}
