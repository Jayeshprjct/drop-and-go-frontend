import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Popup.module.css";
import { IoClose } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
const Popup = (props) => {
  const BaseUrl = import.meta.env.VITE_SiteUrl;
  const modal = useRef(null);
  const handleClose = () => {
    modal.current.style.display = "none";
  };

  const Redirect = () => {
    modal.current.style.display = "none";
    window.open(`${BaseUrl}/login`, "!blank")?.focus();
  };
  return (
    <div ref={modal} className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.closediv}>
          <div className={styles.close}>
            <IoClose onClick={handleClose} size="2rem" />
          </div>
        </div>
        <div className={styles.heading}>
          <span>
            <AiFillHeart size="2.5rem" color="#ff4545" />
          </span>
          Loved It? You can share too!
        </div>
        <div className={styles.register} onClick={Redirect}>
          Start sharing
        </div>
      </div>
    </div>
  );
};

export default Popup;
