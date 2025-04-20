import styles from "./Main.module.scss";
import Mainbar from "@/widgets/mainbar/Mainbar";
import Sidebar from "@/widgets/sidebar/Sidebar";
import Company from "@/widgets/company/Company";
import { useEffect } from "react";
import { auth } from "@/shared/api/auth";

const Main = () => {

  useEffect(() => {
    const fetchCompany = async () => {
      const isAuth = await auth('admin');
      if (!isAuth) {
        // navigate('/login');
      }
    }
    fetchCompany();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__mainBar}>
        <Mainbar />
      </div>
      <div className={styles.container__sidebar}>
        <Sidebar />
      </div>
      <div className={styles.container__content}>
        <Company />
      </div>
    </div>
  );
};

export default Main;
