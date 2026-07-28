'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Prototype } from '@/types/prototypes';
import { fetchPrototypeDetail } from '@/lib/api/details';
import styles from './PrototypeDetail.module.css';

interface PrototypeDetailProps {
  id: string;
}

export default function PrototypeDetailPage({ id }: PrototypeDetailProps) {
  const [prototype, setPrototype] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPrototypeDetail(Number(id));
        setPrototype(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return <div className={styles.prototypeContainer}>データを読み込み中...</div>;
  }

  if (error) {
    return <div className={styles.prototypeContainer} role="alert">{error}</div>;
  }

  if (!prototype) return null;


  const authorName = prototype.name || 'ユーザー';

  const userId = prototype.userId;

  return (
    <article className={styles.prototypeContainer}>

      <h1 className={styles.titleprototype}>{prototype.title}</h1>

      <div className={styles.nameWrapper}>

        <Link href={`/users/${userId}`} className={styles.nameLink}>
          by {authorName}
        </Link>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.editBtn}>
          編集
        </button>
        <button type="button" className={styles.deleteBtn}>
          削除
        </button>
      </div>

      <div className={styles.prototypeImageWrapper}>
        <img
          src={prototype.imageUrl || 'https://picsum.photos/600/300'}
          alt={prototype.title}
          className={styles.prototypeImage}
        />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>キャッチコピー</h2>

        <p className={styles.sectionContent}>{prototype.catchCopy}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>コンセプト</h2>
        <p className={styles.sectionContent}>{prototype.concept}</p>
      </section>
    </article>
  );
}