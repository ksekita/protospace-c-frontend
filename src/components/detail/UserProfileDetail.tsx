import styles from './UserProfileDetail.module.css';

export interface UserProfile {
  name: string;
  profile: string;
  affiliation: string; 
  role: string;
}

const MOCK_USER: UserProfile = {
  name: '名前',
  profile: 'テキストテキストテキストテキストテキストテキストテキストテキスト',
  affiliation: 'テキストテキストテキスト',
  role: 'テキストテキストテキスト',
};

export default function UserProfileDetail(){
  const user = MOCK_USER;
  return(
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