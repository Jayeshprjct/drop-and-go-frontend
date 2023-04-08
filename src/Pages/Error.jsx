import React from "react";
import styles from "../styles/Error.module.css";

const Error = () => {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>Oops!</div>
      <div className={styles.subheading}>
        The Page you are trying to look doesn't exist
      </div>
    </div>
  );
};

export default Error;
