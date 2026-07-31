import api from "@/lib/api/apiClient";
import styles from "./edit.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";
import { userInfo } from "@/lib/api/useGetPrototype";
import { redirect } from "next/navigation";

export default async function EditPrototypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prototypeId = Number(id);
  const response = await api.get(`prototypes/${prototypeId}`);
  const user = await userInfo();
  const prototypeData = response.data;

  if (user.id !== prototypeId) {
    redirect(`/prototype/${prototypeId}`);
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>プロトタイプ編集画面</h2>
      <Editprototype initialData={prototypeData} />
    </main>
  );
}
