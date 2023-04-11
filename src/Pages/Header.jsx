import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import { FiFileText, FiLogOut } from "react-icons/fi";
import { MdWavingHand } from "react-icons/md";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = (props) => {
  let navigate = useNavigate();
  const [sidebar, setsidebar] = useState(false);
  const [name, setName] = useState("");
  const [menu, setMenu] = useState("default");
  const handleClick = () => {
    setsidebar(!sidebar);
  };

  useEffect(() => {
    const user = Cookies.get("name");
    setName(user);
  });

  useEffect(() => {
    if (name != "" && name != undefined) {
      setMenu("login");
      console.log(menu);
      console.log(name);
    } else {
      setMenu("default");
      console.log(menu);
    }
  });

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
    {
      id: 1,
      title: "Login",
      url: "/login",
      icon: <AiOutlineUser size="2.4rem" color="#292929" />,
    },
    {
      id: 2,
      title: "Signup",
      url: "/signup",
      icon: <AiOutlineUserAdd size="2.4rem" color="#292929" />,
    },
    {
      id: 3,
      title: "Data we use",
      url: "/data-we-use",
      icon: <HiOutlineDocumentCheck size="2.4rem" color="#292929" />,
    },
    {
      id: 4,
      title: "Privacy Policy",
      url: "/privacy-policy",
      icon: <FiFileText size="2.4rem" color="#292929" />,
    },
  ]);

  const [loginLinks, setloginLinks] = useState([
    {
      id: 1,
      title: "Dashboard",
      url: "/dashboard",
      icon: <AiOutlinePlusCircle size="2.4rem" color="#616161" />,
    },
    {
      id: 2,
      title: "My Files",
      url: "/myuploads",
      icon: <BsCloudUpload size="2.4rem" color="#616161" />,
    },
    {
      id: 3,
      title: "Logout",
      url: "logout",
      icon: <FiLogOut size="2.4rem" color="#616161" />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <div className={styles.main}>
        <div className={styles.title} onClick={() => redirect("/")}>
          DROP-N-GO
        </div>
        <div className={styles.icon_menu} onClick={() => handleClick()}>
          <AiOutlineMenu />
        </div>
        {menu == "default" ? (
          <div
            className={
              sidebar
                ? `${styles.mainSidebar} ${styles.open}`
                : `${styles.mainSidebar}`
            }
          >
            <div className={styles.button_cross}>
              <RiCloseCircleFill
                onClick={() => {
                  handleClick();
                }}
                color="#454545"
              />
            </div>
            <div className={styles.container_div}>
              {linkdetail.map((item) => {
                return (
                  <div key={item.id} className={styles.Linkdiv}>
                    <div>{item.icon}</div>
                    <div
                      className={styles.linkText}
                      onClick={() => redirect(item.url)}
                    >
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className={
              sidebar
                ? `${styles.mainSidebar} ${styles.open}`
                : `${styles.mainSidebar}`
            }
          >
            <div className={styles.button_cross}>
              <RiCloseCircleFill
                onClick={() => {
                  handleClick();
                }}
                color="#454545"
              />
            </div>
            <div className={styles.container_div}>
              <div className={styles.hellotxt}>
                Hello, {name}{" "}
                <span>
                  <MdWavingHand color="#f3b542" />
                </span>
              </div>
              {loginLinks.map((item) => {
                return (
                  <div key={item.id} className={styles.Linkdiv}>
                    <div>{item.icon}</div>
                    <div
                      className={styles.linkText}
                      onClick={() => redirect(item.url)}
                    >
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Header.defaultProps = {
//   menu: false,
// };

export default Header;
