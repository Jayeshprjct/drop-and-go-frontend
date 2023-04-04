import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { RiCloseCircleFill } from "react-icons/ri";
const Sidebar = () => {
  const [sidebar, setsidebar] = useState(false);
  const handleClick = () => {
    setsidebar(true);
  };
  return sidebar === true ? (
    <div className={styles.main}>
      <div className={styles.button_cross}>
        <RiCloseCircleFill
          onClick={() => {
            handleClick();
          }}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default Sidebar;
