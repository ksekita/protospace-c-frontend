import Link from "next/link";
import styles from "./Greeting.module.css";
import { userInfo } from "@/lib/api/prototype-list/useGetPrototype";

export default async function Greeting() {
  const user = await userInfo();
  const userId = user.id;
  const userName = user.name;
  if (userId === null || userId === undefined) {
    return null;
  } else {
    return (
      <div className={styles.greeting}>
        こんにちは、
        <Link href={`/users/${userId}`} className={styles.user_link}>
          {userName}さん
        </Link>
      </div>
    );
  }
}

/**
 * <form
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
 */
