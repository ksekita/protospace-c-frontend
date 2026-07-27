'use client';

import { useState, useEffect } from 'react';
import { fetchUserProfile } from '@/lib/api/details';
import { UserProfileData } from '@/types/users';
import styles from './UserProfileDetail.module.css';

export default function UserProfile({ id }: { id: string }) {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserProfile(Number(id));
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) return <div>データを読み込み中...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!user) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{user.name}さんの情報</h2>

      <table className={styles.profileTable}>
        <tbody>
          <tr>
            <th scope="row" className={styles.headerCell}>名前</th>
            <td className={styles.dataCell}>{user.name}</td>
          </tr>
          <tr>
            <th scope="row" className={styles.headerCell}>プロフィール</th>
            <td className={styles.dataCell}>{user.profile}</td>
          </tr>
          <tr>
            <th scope="row" className={styles.headerCell}>所属</th>
            <td className={styles.dataCell}>{user.affiliation}</td>
          </tr>
          <tr>
            <th scope="row" className={styles.headerCell}>役職</th>
            <td className={styles.dataCell}>{user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}