import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
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
  console.log(baseUrl);

  return (
    <>
      {/* <h2 className={styles.page_heading}>{username} さんのプロトタイプ</h2> */}
      <div className={styles.grid}>
        {/* prototypesが配列かどうかをチェックしてからmapを回す */}
        {Array.isArray(prototypes) ? (
          prototypes.map((proto) => (
            <div key={proto.id} className={styles.card}>
              <div className={styles.image_wrapper}>
                <Link href={`/prototype/${proto.id}`}>
                  <div className={styles.image_placeholder}>
                    <Image
                      src={`${baseUrl}/images/${(proto as Prototype & { image?: string }).image ?? ""}`}
                      width={300}
                      height={300}
                      alt="Picture of the author"
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
                    href={`/users/${userId}`}
                    className={styles.author_link}
                  >
                    {username}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* データが取得できなかった（配列ではない）場合の表示 */
          <p>プロトタイプを読み込めませんでした。</p>
        )}
      </div>
    </>
  );
}
