import PrototypeList from "@/components/users/detail/PrototypeList";
import Detail from "@/components/users/detail/Detail";
import styles from "./UserDetail.module.css";
import { userDetailInfo } from "@/lib/api/userDetail";
import { userInfo } from "@/lib/api/useGetPrototype";
import { notFound } from "next/navigation";

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const resultId = resolvedParams.id;
  // 型変換
  const userId = Number(resultId);

  const response = await userDetailInfo(userId);

  if ("error" in response) {
    return notFound();
  }

  const userData = response.responseUserInfo;
  const currentUserData = await userInfo();
  // 箱の定義　どこからとってきた何なのか

  return (
    <div className="inner">
      <div className={styles.user_wrapper}>
        <Detail user={userData} currentUser={currentUserData} />
        {/* 今ログインしているユーザーは誰なのか？を渡す */}
        <PrototypeList
          prototypes={response.responsePrototypeList}
          username={response.responseUserInfo.name}
          userId={response.responseUserInfo.id}
        />
      </div>
    </div>
  );
}
