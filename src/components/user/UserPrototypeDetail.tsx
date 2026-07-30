'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Prototype } from '@/types/prototypes';
import { fetchUserPrototypes } from '@/lib/api/details';
import styles from './UserPrototypeDetail.module.css';

interface UserPrototypeDetailProps {
  id: string; // PK id
}

export default function UserPrototypeDetail({ id }: UserPrototypeDetailProps) {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchUserPrototypes(Number(id));
        setPrototypes(data);
      } catch (error) {
        console.error('エラー発生:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return <div className={styles.container}>プロトタイプを読み込み中...</div>;
  }

  if (prototypes.length === 0) {
    return <div className={styles.container}>投稿されたプロトタイプがありません。</div>;
  }

  const userName = prototypes[0]?.name || 'ユーザー';

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>{userName}さんのプロトタイプ</h2>

      <div className={styles.grid}>
        {prototypes.map((item) => (
          <article key={item.id} className={styles.card}>
            <Link href={`/prototype/${item.id}`} className={styles.cardLink}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.prototypeTitle}>{item.title}</h3>
                <p className={styles.prototypeConcept}>{item.concept}</p>
              </div>
            </Link>
            <div className={styles.authorWrapper}>
              <Link href={`/users/${id}`}>
                <span className={styles.authorName}>by {userName}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}