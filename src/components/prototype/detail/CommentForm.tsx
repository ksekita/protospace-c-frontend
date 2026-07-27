'use client';
import styles from './CommentForm.module.css';
import { useState } from 'react';

interface Comment {
  id: number;
  text: string;
  createdAt: string;
}

export default function CommentForm(){

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: 'first text', createdAt: '14:20' },
    { id: 2, text: 'second text', createdAt: '14:22' },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return; // NOT NULL

    const newComment: Comment = {
      id: Date.now(),
      text: inputText,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setComments([...comments, newComment]); // add comments
    setInputText(''); // initialize form
  };
  return(
    <section className={styles.commentContainer}>
      <h3 className={styles.title}>コメント ({comments.length})</h3>

      <form onSubmit={handleSubmit} className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="コメントを入力してください..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          送信
        </button>
      </form>
{/* commentlist、後でcommentListコンポーネントに切り替える */}
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <span className={styles.commentText}>{comment.text}</span>
            <span className={styles.commentTime}>{comment.createdAt}</span>
          </li>
        ))}
      </ul>
    </section>

  );
}