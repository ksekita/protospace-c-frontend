import styles from "./Footer.module.css";

export default async function Footer() {
  "use cache";
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>
        Copyright &copy; PROTO SPACE All rights reserved.
      </small>
    </footer>
  );
}
