import Link from "next/link";
import styles from "./page.module.css";

const mockPrototypes = [
  {
    id: "1",
    title: "prototype1",
    concept: "テキストテキストテキスト",
    author: "投稿者の名前",
  },
  {
    id: "2",
    title: "prototype2",
    concept: "テキストテキストテキスト",
    author: "投稿者の名前",
  },
  {
    id: "3",
    title: "prototype3",
    concept: "テキストテキストテキスト",
    author: "投稿者名前",
  },
  {
    id: "3",
    title: "prototype3",
    concept: "テキストテキストテキスト",
    author: "投稿者名前",
  },
  {
    id: "3",
    title: "prototype3",
    concept: "テキストテキストテキスト",
    author: "投稿者名前",
  },
  {
    id: "3",
    title: "prototype3",
    concept: "テキストテキストテキスト",
    author: "投稿者名前",
  },
  {
    id: "3",
    title: "prototype3",
    concept: "テキストテキストテキスト",
    author: "投稿者名前",
  },
];

export default function Home() {
  const userName = "テストユーザー";

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        こんにちは、
        <Link href="/users/1" className={styles.userLink}>
          {userName}さん
        </Link>
      </div>

      <div className={styles.grid}>
        {mockPrototypes.map((proto) => (
          <div key={proto.id} className={styles.card}>
            <div className={styles.image_Wrapper}>
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
    </div>
  );
}
