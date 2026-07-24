import PrototypeList from "@/components/users/detail/PrototypeList";
import Detail from "@/components/users/detail/Detail";
import styles from "./UserDetail.module.css";
import { userDetail } from "@/lib/api/userDetail";
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
  const response = await userDetail(userId);
  // notfoudページ後日実装
  if ("error" in response) {
    return notFound();
  }

  // バックエンドとつなげた際にログチェックするために残しておく
  // console.log("詳細データ:", response);

  return (
    <div className="inner">
      <div className={styles.user_wrapper}>
        {/* このresponse.userDetailとprototypeListは、受け取る変数はbackendによって変化する */}
        <Detail user={response.userDetail} />
        <PrototypeList
          prototypes={response.prototypeList}
          username={response.userDetail.name}
        />
      </div>
    </div>
  );
}
