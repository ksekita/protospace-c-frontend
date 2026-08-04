"use client";

import Link from "next/link";
import styles from "./Greeting.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type GreetingProps = {
  userName?: string;
  userId?: number;
};

export default function Greeting({ userName, userId }: GreetingProps) {
  // useRouter for navigation
  const router = useRouter();

  // for getting the search params from the URL
  const searchParams = useSearchParams();

  // get the current keyword and sort from the search params
  const currentKeyword = searchParams.get("keyword") || "";
  const currentSort = searchParams.get("sort") || "latest";

  // useState for searchTerm and sort
  const [searchTerm, setSearchTerm] = useState<string>(currentKeyword);
  const [sort, setSort] = useState<string>(currentSort);

  // serach function
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    updateUrl(searchTerm, sort);
  };

  // order change function
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    updateUrl(searchTerm, selectedSort);
  };

  // URL update function(for using searchTerm and order)
  const updateUrl = (keyword: string, sortOrder: string) => {
    // Create a new URLSearchParams object to build the query string
    const params = new URLSearchParams();

    // Add the keyword and sortOrder to the query string if they are not empty
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (sortOrder) params.set("sort", sortOrder);

    router.push(`/prototypes?${params.toString()}`);
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
          placeholder="記事を検索..."
          className={styles.input_style}
        />
        <button type="submit">検索</button>
      </form>

      {/* order select area */}
      <select
        name="prototypes"
        id="prototype-select"
        value={sort}
        onChange={handleOrderChange}
        className={styles.order_form}
      >
        <option value="latest">新着順</option>
        <option value="oldest">古い順</option>
        <option value="likes">人気順</option>
      </select>
    </div>
  );
}
