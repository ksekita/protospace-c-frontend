"use client";
import { prototypeDelete } from "@/lib/actions/prototypeDelete";
import styles from "./PrototypeDetail.module.css";

interface Props {
  prototypeId: number;
}

export function Delete(props: Props) {
  return (
    <div>
      <button
        className={styles.prototype_btn}
        onClick={() => prototypeDelete(props.prototypeId)}
      >
        削除
      </button>
    </div>
  );
}
