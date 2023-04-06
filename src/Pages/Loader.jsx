import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
