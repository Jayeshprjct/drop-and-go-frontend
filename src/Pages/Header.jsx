import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "../styles/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (url == "logout") {
      logout();
    } else {
      navigate(url);
      closeMenu();
    }
  };

  const Toastprops = (timer) => {
    const toastjson = {
      position: "top-right",
      autoClose: timer || 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    };
    return toastjson;
  };

  const Toast = (msg, type) => {
    if (type == "warning") {
      toast.warn(msg, Toastprops());
    } else if (type == "error") {
      toast.error(msg, Toastprops());
    } else if (type == "info") {
      toast.info(msg, Toastprops());
    } else if (type == "success") {
      toast.success(msg, Toastprops());
    } else {
      toast(msg, Toastprops());
    }
  };

  const flushCookies = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };

  const logout = () => {
    flushCookies();
    Toast("You've logged out!", "success", 1000);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const [linkdetail, setLinkdetail] = useState([
    { id: 1, title: "Login", url: "/login" },
    { id: 2, title: "Signup", url: "/signup" },
    { id: 3, title: "Terms Of use", url: "/terms-of-use" },
    { id: 4, title: "Data we use", url: "/data-we-use" },
    { id: 5, title: "Privacy Policy", url: "/privacy-policy" },
  ]);

  const [loginLinks, setloginLinks] = useState([
    { id: 1, title: "Dashboard", url: "/dashboard" },
    { id: 2, title: "My Files", url: "/myfiles" },
    { id: 3, title: "Logout", url: "logout" },
  ]);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.title} onClick={() => redirect("/")}>
          DROP-N-GO
        </div>
        <div className={styles.icon_menu} onClick={() => handleClick()}>
          <AiOutlineMenu />
        </div>
        {sidebar &&
          (props.menu == "default" ? (
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
          ) : (
            <div className={style.main}>
              <div className={style.button_cross}>
                <RiCloseCircleFill
                  onClick={() => {
                    handleClick();
                  }}
                />
              </div>
              <div className={style.container_div}>
                {loginLinks.map((item) => {
                  return (
                    <div key={item.id} className={style.Linkdiv}>
                      <div onClick={() => redirect(item.url)}>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Header.defaultProps = {
  menu: true,
};

export default Header;
