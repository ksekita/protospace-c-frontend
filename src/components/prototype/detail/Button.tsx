"use client";

import Link from "next/link";
import styles from "./PrototypeDetail.module.css";
import { prototypeDelete } from "@/lib/actions/prototypeDelete";
import { Prototype } from "@/types/prototype";

interface Props {
  prototypeDetail: Prototype;
}

export default function Button(props: Props) {
  return (
    <div className={styles.prototype_manage}>
      <Link
        href={`/prototypes/${props.prototypeDetail.id}/edit`}
        className={styles.prototype_btn}
      >
        編集
      </Link>
      <div>
        <button
          className={styles.prototype_btn}
          onClick={() => prototypeDelete(props.prototypeDetail.id)}
        >
          削除
        </button>
      </div>
    </div>
  );
}
