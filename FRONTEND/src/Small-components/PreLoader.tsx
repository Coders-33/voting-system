import React from 'react';
import styles from "../Styling/PreLoader.module.css"


const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Preloader;
