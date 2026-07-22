import Link from "next/link";
import styles from "@/app/page.module.css";

type Prototype = {
  id: string;
  title: string;
  concept: string;
  author: string;
};

type PrototypeListProps = {
  prototypes: Prototype[];
};

export default function PrototypeList({ prototypes }: PrototypeListProps) {
  return (
    <div className={styles.grid}>
      {prototypes.map((proto) => (
        <div key={proto.id} className={styles.card}>
          <div className={styles.image_wrapper}>
            <Link href={`/prototypes/${proto.id}`}>
              <div className={styles.imagePlaceholder} />
            </Link>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>
              <Link href={`/prototypes/${proto.id}`}>{proto.title}</Link>
            </h3>
            <p className={styles.cardConcept}>{proto.concept}</p>
            <div className={styles.cardAuthor}>
              by{" "}
              <Link href={`/users/${proto.id}`} className={styles.authorLink}>
                {proto.author}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
