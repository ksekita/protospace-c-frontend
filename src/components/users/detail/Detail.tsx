import { ResponseUserInfo } from "@/types/UserDetailType";
import styles from "./Detail.module.css";
import Link from "next/link";

type UserDetailProps = {
  user: ResponseUserInfo;
};

export default function Detail(props: UserDetailProps) {
  return (
    <>
      <div className={styles.header_wrapper}>
        <h2 className={styles.page_heading}>{props.user.name} さんの情報</h2>
        <Link
          href={`/users/${props.user.id}/edit`}
          className={styles.edit_button}
        >
          ユーザー編集
        </Link>
      </div>

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
