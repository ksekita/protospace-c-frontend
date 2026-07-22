import Link from 'next/link';
import styles from './UserPostsDetail.module.css';



export interface PostItem {
  id: string;
  userId: string;
  title: string;
  concept: string;
  userName: string;
  imageUrl: string;
}

const MOCK_POSTS: PostItem[] = [
  {
    id: '1',
    userId: 'user123',
    title: 'ウェブアプリ１',
    concept: 'テキストテキストテキスト',
    userName: '名前',
    imageUrl: 'https://picsum.photos/400/300?random=1',
  },
  {
    id: '2',
    userId: 'user123',
    title: 'ウェブアプリ２',
    concept: 'テキストテキストテキスト',
    userName: '名前',
    imageUrl: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: '3',
    userId: 'user123',
    title: 'ウェブアプリ３',
    concept: 'テキストテキストテキスト',
    userName: '名前',
    imageUrl: 'https://picsum.photos/400/300?random=3',
  },
];

export default function UserPostsDetail() {

  const posts = MOCK_POSTS;

  return (
    <section className={styles.container}>

      <h2 className={styles.sectionTitle}>名前さんのプロトタイプ</h2>
      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <Link href={`/posts/${post.id}`} className={styles.cardLink}>
              <div className={styles.imageWrapper}>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postConcept}>{post.concept}</p>
              </div>
            </Link>
            <div className={styles.authorWrapper}>
              <Link href={`/users/${post.userId}`}>
                <span className={styles.authorName}>by {post.userName}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section >
  );
}