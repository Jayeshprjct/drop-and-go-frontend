import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const handleClick = (url) => window.open(url, "!blank")?.focus();
  const [url, setUrl] = useState([
    {
      id: 1,
      url: "https://www.freeprivacypolicy.com/live/021e8266-1873-4cc4-ac44-e92eb4f86be3",
    },
    { id: 2, url: "https://www.youtube.com" },
    { id: 3, url: "https://www.youtube.com" },
    { id: 4, url: "https://www.youtube.com" },
  ]);
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left}>
          <h3>DROP-N-GO</h3>
          <div className={styles.title}>Share Files Quickly</div>
        </div>
        <div className={styles.right}>
          <div
            className={styles.linkItem}
            onClick={() => handleClick(url[0].url)}
          >
            Privacy Policy
          </div>
          <div
            className={styles.linkItem}
            onClick={() => handleClick(url[1].url)}
          >
            Terms & Conditions
          </div>
          <div
            onClick={() => handleClick(url[2].url)}
            className={styles.linkItem}
          >
            How to Use?
          </div>
          <div
            className={styles.linkItem}
            onClick={() => handleClick(url[3].url)}
          >
            Data we use
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
