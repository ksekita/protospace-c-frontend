import Link from "next/link";
import styles from "./Greeting.module.css";

export type GreetingProps = {
  userName?: string;
  userId?: number;
};

export default function Greeting({ userName, userId }: GreetingProps) {
  if (userId === null) {
    return (
      <div className={styles.greeting}>
        こんにちは、
        <Link href="#" className={styles.user_link}>
          テストユーザーさん
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.greeting}>
        こんにちは、
        <Link href={`/users/${userId}`} className={styles.user_link}>
          {userName}さん
        </Link>
      </div>
    );
  }
}
