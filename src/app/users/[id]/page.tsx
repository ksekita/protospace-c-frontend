import PrototypeList from "@/components/users/detail/PrototypeList";
import Detail from "@/components/users/detail/Detail";
import styles from "./UserDetail.module.css";
import { userDetail } from "@/lib/api/userDetail";
import { notFound } from "next/navigation";

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const userId = (await params).id;
  const response = await userDetail(userId);
  // notfoudページ後日実装
  if ("error" in response) {
    return notFound();
  }

  // 後で消す
  console.log("詳細データ:", response);

  return (
    <div className="inner">
      <div className={styles.user_wrapper}>
        {/* このrespomse.userDetailとprototypeListは、受け取る変数はbackendによって変化する */}
        <Detail user={response.userDetail} />
        <PrototypeList
          prototypes={response.prototypeList}
          username={response.userDetail.name}
        />
      </div>
    </div>
  );
}
