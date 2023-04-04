import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "../styles/Sidebar.module.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();
  const [sidebar, setsidebar] = useState(false);
  const handleClick = () => {
    setsidebar(!sidebar);
  };

  const closeMenu = () => {
    if (sidebar) {
      setsidebar(!sidebar);
    }
  };

  const redirect = (url) => {
    navigate(url);
    closeMenu();
  };

  const [linkdetail, setLinkdetail] = useState([
    { id: 1, title: "Login", url: "/Login" },
    { id: 2, title: "Signup", url: "/Signup" },
    { id: 3, title: "Terms Of use", url: "/Terms-of-use" },
    { id: 4, title: "Data we use", url: "/Data-we-use" },
    { id: 5, title: "Privacy Policy", url: "/Privacy-policy" },
  ]);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.title} onClick={() => redirect("/")}>
          DROP-N-GO
        </div>
        {props.menu === true ? (
          <div className={styles.icon_menu} onClick={() => handleClick()}>
            <AiOutlineMenu />
          </div>
        ) : (
          ""
        )}
        {sidebar && (
          <div className={style.main}>
            <div className={style.button_cross}>
              <RiCloseCircleFill
                onClick={() => {
                  handleClick();
                }}
              />
            </div>
            <div className={style.container_div}>
              {linkdetail.map((item) => {
                return (
                  <div key={item.id} className={style.Linkdiv}>
                    <div onClick={() => redirect(item.url)}>{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Header.defaultProps = {
  menu: true,
};

export default Header;
