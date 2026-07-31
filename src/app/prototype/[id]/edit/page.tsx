import api from "@/lib/api/apiClient";
import styles from "./edit.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";
import { userInfo } from "@/lib/api/useGetPrototype";
import { redirect } from "next/navigation";
import { prototypeDetail } from "@/lib/api/prototypeDetail";

export default async function EditPrototypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prototypeId = Number(id);
  const response = await api.get(`prototypes/${prototypeId}`);
  const protoTypeUserId = await prototypeDetail(prototypeId);
  const user = await userInfo();
  const prototypeData = response.data;

  if (user.id !== protoTypeUserId.userId) {
    redirect(`/prototype/${prototypeId}`);
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>プロトタイプ編集画面</h2>
      <Editprototype initialData={prototypeData} />
    </main>
  );
}
