import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/Login.module.css";
import CarouselC from "./Carousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [isRegistered, setRegistered] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [Loading, setLoading] = useState(true);
  const handlepassVisibility = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");
    if (user != undefined && token != undefined) {
      setLoading(false);
      navigate(`/login`);
    } else {
      setLoading(false);
    }
  });

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

  const handleLogin = () => {
    if (name != "" && email != "" && pass != "") {
      if (emailRegex.test(email)) {
        setLoading(true);
        Register(email, name, pass);
      } else {
        Toast("Invalid Email Id", "error");
      }
    } else {
      Toast("Invalid/Empty Inputs", "error");
    }
  };

  const sendHome = () => {
    navigate("/dashboard");
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

  const clearBoxes = () => {
    setName("");
    setEmail("");
    setPass("");
  };

  const Register = (email, name, pass) => {
    axios
      .post(`${BaseUrl}/register`, {
        name: name,
        password: pass,
        email: email,
      })
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          // clearBoxes();
          console.log(response.data);
          Cookies.set("user", response.data.requestedUser.email);
          Cookies.set("token", response.data.requestedUser.password, {
            expires: 1,
          });
          Toast("Registered successfully", "success");
          setTimeout(() => {
            sendHome();
          }, 3000);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.data.message == "User already exists!") {
          Toast(`Account Already Exist!`, "warning");
          clearBoxes();
        }
      });
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <Header menu="default" />
          <div className={styles.main}>
            <div className={styles.left}>
              <CarouselC />
            </div>
            <div className={styles.right}>
              <div className={styles.right_main}>
                <div className={styles.title}>DROP-N-GO</div>
                <div className={styles.desc}>
                  No acccount? No worries!.. Make One Instantly
                </div>
                <div className={styles.lowerdiv}>
                  <div className={styles.input_box}>
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      type="text"
                      placeholder="Name"
                    />
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
                  <div className={styles.chkbox}>
                    <div className={styles.forget_pass}>Forget Password?</div>
                  </div>
                  <div className={styles.submit_btn} onClick={handleLogin}>
                    SUBMIT
                  </div>
                  <div
                    className={styles.switchLogin}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Already Have account? Login
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

export default Signup;
