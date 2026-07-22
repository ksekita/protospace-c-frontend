import Link from "next/link";
import styles from "@/app/page.module.css";

type GreetingProps = {
  userName: string;
};

export default function Greeting({ userName }: GreetingProps) {
  return (
    <div className={styles.greeting}>
      こんにちは、
      <Link href="/users/1" className={styles.userLink}>
        {userName}さん
      </Link>
    </div>
  );
}
