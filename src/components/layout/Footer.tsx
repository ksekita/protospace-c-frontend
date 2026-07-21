import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>
        Copyright &copy; PROTO SPACE All rights reserved.
      </small>
    </footer>
  );
}
