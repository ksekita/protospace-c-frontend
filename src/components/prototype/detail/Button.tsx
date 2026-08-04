import Link from "next/link";
import styles from "./PrototypeDetail.module.css";
import { userInfo } from "@/lib/api/prototype-list/useGetPrototype";
import { Delete } from "./Delete";

interface Props {
  prototypeId: number;
  prototypeUseeId?: number;
}

export async function Button(props: Props) {
  const user = await userInfo();

  if (user.id !== props.prototypeUseeId) {
    return null;
  }

  return (
    <div className={styles.prototype_manage}>
      <Link
        href={`/prototype/${props.prototypeId}/edit`}
        className={styles.prototype_btn}
      >
        編集
      </Link>
      <Delete prototypeId={props.prototypeId} />
    </div>
  );
}
