"use client";

import styles from "./Search.module.css";

interface Props {
  sort: string | undefined;
}

export default function SelectButton({ sort }: Props) {
  console.log("sort", sort);

  const kinds = new Map<string | undefined, string>();
  kinds.set("latest", "新着順");
  kinds.set("oldest", "古い順");
  kinds.set("likes", "人気順");
  kinds.set(undefined, "新着順");

  return (
    <select
      name="sort"
      id="prototype-select"
      className={styles.order_form}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      <option value="latest">新着順</option>
      <option value="oldest">古い順</option>
      <option value="likes">人気順</option>
    </select>
  );
}
