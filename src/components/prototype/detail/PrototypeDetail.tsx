import Link from "next/link";
import styles from "./PrototypeDetail.module.css";
import Image from "next/image";
import { Prototype } from "@/types/prototype";

interface Props {
  prototypeDetail: Prototype;
}

export default function PrototypeDetail(props: Props) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const baseUrl = new URL(backendUrl).origin;
  return (
    <>
      {/* タイトル */}
      <p className={styles.title}>{props.prototypeDetail.title}</p>
      {/* ユーザー名 */}
      <Link
        href={`/users/${props.prototypeDetail.userId}`}
        className={styles.prototype_user}
      >
        by {props.prototypeDetail.name}
      </Link>
      {/* 画像 */}
      <div className={styles.prototype_image}>
        <Image
          src={`${baseUrl}/images/${props.prototypeDetail.image}`}
          width={300}
          height={300}
          alt={props.prototypeDetail.title}
        />
      </div>
      <div>
        <div className={styles.prototype_detail}>
          <p className={styles.detail_title}>キャッチコピー</p>
          {/* キャッチコピー */}
          <p>{props.prototypeDetail.catchCopy}</p>
        </div>
        <div className={styles.prototype_detail}>
          <p className={styles.detail_title}>コンセプト</p>
          {/* コンセプト */}
          <p>{props.prototypeDetail.concept}</p>
        </div>
      </div>
    </>
  );
}
