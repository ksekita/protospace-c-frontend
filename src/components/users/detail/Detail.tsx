import { UserDetail } from "@/types/UserDetail";
import styles from "./Detail.module.css";

type UserDetailProps = {
  user: UserDetail;
};

export default function Detail(props: UserDetailProps) {
  return (
    <>
      <h2 className={styles.page_heading}>テストユーザーさんの情報</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.table_col1}>名前</th>
            <td className={styles.table_col2}>{props.user.name}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>プロフィール</th>
            <td className={styles.table_col2}>{props.user.profile}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>所属</th>
            <td className={styles.table_col2}>{props.user.affiliation}</td>
          </tr>
          <tr>
            <th className={styles.table_col1}>役職</th>
            <td className={styles.table_col2}>{props.user.position}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
