import Link from "next/link";
import styles from "./PrototypeDetail.module.css";
import Image from "next/image";
import { Prototype } from "@/types/prototype";
import Button from "./Button";
import { imageBaseUrl } from "@/lib/api/imageBaseUrl";

interface Props {
  prototypeDetail: Prototype;
  userId?: number;
}

export default function PrototypeDetail(props: Props) {
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
      {props.userId === props.prototypeDetail.userId && (
        <Button prototypeDetail={props.prototypeDetail} />
      )}
      {/* 画像 */}
      <div className={styles.prototype_image}>
        <Image
          src={`${imageBaseUrl}/images/${props.prototypeDetail.image}`}
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
