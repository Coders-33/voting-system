import React from "react";
import styles from "../Styling/NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! Page Not Found.</p>
    </div>
  );
};

export default NotFound;
