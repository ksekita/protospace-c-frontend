// ユーザー編集ページ
import { Suspense } from "react";
import style from "./page.module.css";
import EditUserForm from "./EditUserForm";

export type PageProps = {
  params: { id: string };
};

export default async function EdituserInfo({
  //編集前の内容を取得する処理
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <h1 className={style.title}>ユーザー情報編集ページ✍</h1>
      <Suspense>
        <EditUserForm params={params} />
      </Suspense>
    </>
  );
}
