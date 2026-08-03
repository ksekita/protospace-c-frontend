import PrototypeList from "@/components/users/detail/PrototypeList";
import Detail from "@/components/users/detail/Detail";
import styles from "./UserDetail.module.css";
import { Suspense } from "react";

export default function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="inner">
      <div className={styles.user_wrapper}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail userId={params} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PrototypeList userId={params} />
        </Suspense>
      </div>
    </div>
  );
}
