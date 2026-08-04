// ユーザー編集ページ
import Useredit from "@/components/users/[id]/edit/page";
import style from "./page.module.css";
import api from "@/lib/api/apiClient";
import { redirect } from "next/navigation";
import { userInfo } from "@/lib/api/useGetPrototype";

export type PageProps = {
  params: { id: string };
};

export default async function EdituserInfo({
  //編集前の内容を取得する処理
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUser = await userInfo();
  if (String(currentUser.id) !== String(id)) {
    redirect(`/users/${id}`);
  }
  const response = await api.get(`/users/${id}`);
  const userData = response.data;

  return (
    <>
      <h1 className={style.title}>ユーザー情報編集ページ✍</h1>
      <Useredit userData={userData} userId={id} />
    </>
  );
}
