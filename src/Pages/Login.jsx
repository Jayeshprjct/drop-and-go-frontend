import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/Login.module.css";
import CarouselC from "./Carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "./Loader";

const Login = () => {
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isRegistered, setRegistered] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [Loading, setLoading] = useState(true);
  const handlepassVisibility = () => {
    setShowPass(!showPass);
  };

  const toggleRegistered = () => {
    setRegistered(!isRegistered);
  };

  const toastProps = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const Toast = (msg, type) => {
    if (type == "warning") {
      toast.warn(msg, toastProps);
    } else if (type == "error") {
      toast.error(msg, toastProps);
    } else if (type == "info") {
      toast.info(msg, toastProps);
    } else if (type == "success") {
      toast.success(msg, toastProps);
    } else {
      toast(msg, toastProps);
    }
  };

  const handleLogin = () => {
    if (email != "" && pass != "") {
      if (emailRegex.test(email)) {
        checkLogin(email, pass);
      }
    } else {
      Toast("Invalid/Empty Email & Password", "warning");
    }
  };

  const checkData = (email, pass) => {
    axios
      .post(`${BaseUrl}/login`, {
        email: email,
        password: pass,
      })
      .then((response) => {
        if (response.data.status == "OK") {
          Cookies.set("user", response.data.requestedUser.email);
          Cookies.set("name", response.data.requestedUser.name.split(" ")[0]);
          Cookies.set("token", response.data.requestedUser.password, {
            expires: 1,
          });
          sendHome();
        }
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);
        if (error.response.data.message == "Invalid User") {
          Toast("Account Not Found", "error");
        } else if (error.response.data.message == "Incorrect Password") {
          logout();
        }
      });
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
    Toast("Please Login again", "success", 1000);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");
    if (user != undefined && token != undefined) {
      checkData(user, token);
    } else {
      setLoading(false);
    }
  }, []);

  const sendHome = () => {
    setLoading(false);
    navigate("/dashboard");
  };

  const clearBoxes = () => {
    setEmail("");
    setPass("");
  };

  const checkLogin = (email, pass) => {
    axios
      .post(`${BaseUrl}/login`, {
        email: email,
        password: pass,
      })
      .then((response) => {
        clearBoxes();
        if (response.data.status == "OK") {
          Toast("Login Successful", "success");
          Cookies.set("user", response.data.requestedUser.email);
          Cookies.set("name", response.data.requestedUser.name.split(" ")[0]);
          Cookies.set("token", response.data.requestedUser.password, {
            expires: 1,
          });
          sendHome();
        }
        console.log(response.data);
      })
      .catch((error) => {
        clearBoxes();
        console.log(error.response.data);
        if (error.response.data.message == "Invalid User") {
          Toast("Account Not Found", "error");
        } else if (error.response.data.message == "Incorrect Password") {
          Toast("Incorrect Password", "error");
        }
      });
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Header menu="default" />
            <div className={styles.main}>
              <div className={styles.left}>
                <CarouselC />
              </div>
              <div className={styles.right}>
                <div className={styles.right_main}>
                  <div className={styles.title}>DROP-N-GO</div>
                  <div className={styles.desc}>
                    Drop your credentials to start sharing
                  </div>
                  <div className={styles.lowerdiv}>
                    <div className={styles.input_box}>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        type="text"
                        placeholder="Email Id"
                      />
                      <div className={styles.pass_box}>
                        <input
                          onChange={(e) => {
                            setPass(e.target.value);
                          }}
                          value={pass}
                          type={showPass === true ? "text" : "password"}
                          placeholder="Password"
                        />
                        <div
                          className={styles.show_pass}
                          onClick={() => handlepassVisibility()}
                        >
                          {showPass === true ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.submit_btn} onClick={handleLogin}>
                      SUBMIT
                    </div>
                    <div
                      className={styles.switchLogin}
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Not having account? Register
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
