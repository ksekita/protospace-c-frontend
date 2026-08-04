import api from "@/lib/api/apiClient";
import styles from "./edit.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";
import { redirect } from "next/navigation";
import { prototypeDetail } from "@/lib/api/prototypeDetail";
import { userInfo } from "@/lib/api/useGetPrototype";

type PageProps = {
  params: { id: string };
};

export default async function EditPrototypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prototypeId = Number(id);

  const protoTypeUserId = await prototypeDetail(prototypeId);
  const user = await userInfo();
  const response = await api.get(`prototypes/${prototypeId}`);
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
