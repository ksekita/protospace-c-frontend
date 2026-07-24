import { Prototype } from "@/types/prototype";
import styles from "./PrototypeList.module.css";
import Link from "next/link";

type PrototypeListProps = {
  prototypes: Prototype[];
  username: string;
};

export default function PrototypeList({
  prototypes,
  username,
}: PrototypeListProps) {
  return (
    <>
      <h2 className={styles.page_heading}>{username} さんのプロトタイプ</h2>
      <div className={styles.grid}>
        {prototypes.map((proto) => (
          <div key={proto.id} className={styles.card}>
            <div className={styles.image_wrapper}>
              <Link href={`/prototypes/${proto.id}`}>
                <div className={styles.image_placeholder} />
              </Link>
            </div>

            <div className={styles.card_body}>
              <h3 className={styles.card_title}>
                <Link href={`/prototypes/${proto.id}`}>{proto.title}</Link>
              </h3>
              <p className={styles.card_concept}>{proto.concept}</p>
              <div className={styles.card_author}>
                <Link
                  href={`/users/${proto.userId}`}
                  className={styles.author_link}
                >
                  {proto.user?.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
