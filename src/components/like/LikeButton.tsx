"use client";
import styles from "./LikeButton.module.css";
import { likeBtnPost } from "@/lib/api/like/likes";

interface Props {
  prototypeId: number;
  count: number;
  isLiked: boolean;
}

export function LikeButton(props: Props) {
  const likeBtn = async () => {
    // 後日ここにボタンをdisabedを無効にし、setTimeoutで1s後に有効にする
    await likeBtnPost(props.prototypeId);
    const btn = document.getElementById("likeBtn");
    btn?.addEventListener("click", (e: MouseEvent) => {
      const target = e.currentTarget as HTMLButtonElement;
      target.disabled = true;
      setTimeout(() => {
        target.disabled = false;
      }, 1500);
    });
  };

  console.log("押してるかいなか", props.isLiked);

  return (
    <div>
      <button className={styles.btn} onClick={likeBtn}>
        <svg
          id="likeBtn"
          className={`${styles.heart_icon} ${props.isLiked ? styles.active : ""}`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
}
