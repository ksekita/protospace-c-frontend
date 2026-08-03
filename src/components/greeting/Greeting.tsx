"use client";

import Link from "next/link";
import styles from "./Greeting.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type GreetingProps = {
  userName?: string;
  userId?: number;
};

export default function Greeting({ userName, userId }: GreetingProps) {
  // searchTerm を状態管理として扱う
  const [searchTerm, setSearchTerm] = useState<string>("");

  //for changing the page
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // このリンクのページへ移動
    router.push(`/prototypes?keyword=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className={styles.greeting_container}>
      {/* greeting area */}
      <div className={styles.greeting}>
        こんにちは、
        {userId === null || userId === undefined ? (
          <Link href="/" className={styles.user_link}>
            テストユーザーさん
          </Link>
        ) : (
          <Link href={`/users/${userId}`} className={styles.user_link}>
            {userName}さん
          </Link>
        )}
      </div>

      {/* search form area */}
      <form
        onSubmit={handleSearch}
        className={styles.search_form}
        role="search"
      >
        <input
          id="post-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // serachTermという状態に代入
          placeholder="記事を検索..."
          className={styles.input_style}
        />
        <button type="submit">検索</button>
      </form>
    </div>
  );
}
