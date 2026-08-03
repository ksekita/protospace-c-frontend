// ユーザー編集ページの親です
import Useredit from "@/components/users/[id]/edit/page";
import style from "./page.module.css";

export default function EdituserInfo() {
  return (
    <>
      <h1 className={style.title}>ユーザー情報編集ページ✍</h1>
      <Useredit />
    </>
  );
}
