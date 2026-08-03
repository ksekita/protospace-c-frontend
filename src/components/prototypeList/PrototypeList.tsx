import Image from "next/image";
import Link from "next/link";
import styles from "./PrototypeList.module.css";
import { Prototype } from "@/types/prototype";

type PrototypeListProps = {
  prototypes: Prototype[];
  username?: string;
  userId?: number;
};

export default function PrototypeList({
  prototypes,
  userId,
  username,
}: PrototypeListProps) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const baseUrl = new URL(backendUrl).origin;

  if (prototypes.length == 0) {
    return <p>投稿がありません。</p>;
  } else {
    return (
      <>
        {/* <h2 className={styles.page_heading}>{username} さんのプロトタイプ</h2> */}
        <div className={styles.grid}>
          {/* prototypesが配列かどうかをチェックしてからmapを回す */}
          {prototypes.map((proto) => (
            <div key={proto.id} className={styles.card}>
              <div className={styles.image_wrapper}>
                <Link href={`/prototypes/${proto.id}`}>
                  <div className={styles.image_placeholder}>
                    <Image
                      src={`${baseUrl}/images/${(proto as Prototype & { image?: string }).image ?? ""}`}
                      width={300}
                      height={300}
                      alt="Picture of the author"
                      className={styles.image}
                    />
                  </div>
                </Link>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>
                  <Link href={`/prototypes/${proto.id}`}>{proto.title}</Link>
                </h3>
                <p className={styles.card_concept}>{proto.catchCopy}</p>
                <div className={styles.card_author}>
                  <Link
                    href={`/users/${proto.userId}`}
                    className={styles.author_link}
                  >
                    by {proto.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
