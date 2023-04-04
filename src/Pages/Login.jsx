import React, { useState } from "react";
import Header from "./Header";
import styles from "../styles/Login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CarouselC from "./Carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handlepassVisibility = () => {
    setShowPass(!showPass);
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

  const handleLogin = () => {
    if (user != "" && pass != "") {
      if (emailRegex.test(user)) {
        checkLogin(user, pass);
      }
    }
  };

  const Toast = (msg) => {
    toast(msg, toastProps);
  };

  const checkLogin = (user, pass) => {
    axios
      .post(`${BaseUrl}/api/v1/login`, {
        name: "John Doe",
        password: "Hello",
        email: "john.doe@example.com",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.data.message == "Invalid User") {
          Toast("Account Not Found");
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <Header />
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
                    setUser(e.target.value);
                  }}
                  value={user}
                  type="text"
                  placeholder="Username"
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
              <div className={styles.chkbox}>
                <div className={styles.chkbox_div}>
                  <input type="checkbox" name="chkbox" id="chkbox" />
                  <p className={styles.label_chkbox}>Remember Me</p>
                </div>
                <div className={styles.forget_pass}>Forget Password?</div>
              </div>
              <div className={styles.submit_btn} onClick={handleLogin}>
                SUBMIT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
