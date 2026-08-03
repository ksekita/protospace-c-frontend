import styles from "./Detail.module.css";
import { userDetailInfo } from "@/lib/api/userDetail";

type Props = {
  userId: Promise<{ id: string }>;
};

export default async function Detail(props: Props) {
  const { id } = await props.userId;
  const userId = Number(id);

  const response = await userDetailInfo(userId);

  return (
    <>
      <h2 className={styles.page_heading}>{response.name} さんの情報</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.table_col1}>名前</th>
            <td className={styles.table_col2}>{response.name}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>プロフィール</th>
            <td className={styles.table_col2}>{response.profile}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>所属</th>
            <td className={styles.table_col2}>{response.affiliation}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>役職</th>
            <td className={styles.table_col2}>{response.position}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
