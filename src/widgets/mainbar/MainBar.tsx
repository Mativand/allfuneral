import styles from "./Mainbar.module.scss";

const Mainbar = () => {
  return (
    <div className={styles.mainBar}>
      <nav className={styles.mainBar__nav}>
        <div className={styles.mainBar__navTop}>
          <ul className={styles.mainBar__navList}>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.logo}>
                <span className={"_icon-logo"}></span>
              </a>
            </li>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-company"}></span>
              </a>
            </li>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-contractor"}></span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.mainBar__line}></div>
        <div className={styles.mainBar__navBottom}>
          <ul className={styles.mainBar__navList}>
            <li className={styles.mainBar__navBottomItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-settings"}></span>
              </a>
            </li>
            <li className={styles.mainBar__navBottomItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-signOut"}></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Mainbar;
