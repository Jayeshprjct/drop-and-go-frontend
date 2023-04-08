import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import {
  AiOutlineFile,
  AiFillCheckCircle,
  AiOutlineFileAdd,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Loader from "./Loader";
import UploadedLayout from "./UploadedLayout";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const [file, setFile] = useState(null);
  const [size, setSize] = useState("");
  const [slug, setSlug] = useState("");
  const [filename, setFileName] = useState("");
  const [checked, setCheck] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setLoading] = useState("default");
  const [isLoader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Text, setText] = useState("Drag and Drop file here or Choose file");
  const passBoxClassName = !showPass
    ? `${styles.pass_box} ${styles.hideBox}`
    : styles.pass_box;
  const upload = useRef();
  const Fileinfo = useRef();
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    setEmail(Cookies.get("user"));
    setPass(Cookies.get("token"));
    if (email == undefined) {
      navigate("/login");
    }
  });

  function removeFileExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
  }

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

  function handleDrop(event) {
    event.preventDefault();
    Fileinfo.current.style.display = "block";
    for (const file of event.dataTransfer.files) {
      const newFile = file;
      setFile(newFile);
      setFileName(removeFileExtension(newFile.name));
      setSize(
        (convertSize(newFile.size) <= 0 ? "<1" : convertSize(newFile.size)) +
          " MB"
      );
    }
  }

  const convertSize = (size) => {
    return Math.round(size / 1024 ** 2);
  };

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleFileInputChange(event) {
    setText("Drag and Drop file here or Choose file");
    Fileinfo.current.style.display = "block";
    const newFile = event.target.files[0];
    setFileName(removeFileExtension(event.target.files[0].name));
    setFile(newFile);
    setSize(
      (convertSize(newFile.size) < 1 ? "<1" : convertSize(newFile.size)) + " MB"
    );
  }

  const handleInfoClose = () => {
    Fileinfo.current.style.display = "none";
    upload.current.value = "";
    setFile(null);
    setCheck(false);
    setSize("");
    setLoading("default");
  };

  const handleDivClick = () => {
    upload.current.click();
  };

  const fileUpload = () => {
    let form = new FormData();
    if (isPrivate) {
      if (password != "") {
        form.append("file", file);
        form.append("fileName", filename);
        form.append("isPrivate", true);
        form.append("filePassword", password);
        setLoading("loading");
      } else {
        Toast("Password can't be Empty", "error");
      }
    } else {
      form.append("file", file);
      form.append("fileName", filename);
      form.append("isPrivate", false);
      setLoading("loading");
    }
    axios
      .post(`${BaseUrl}/file/upload`, form, {
        headers: {
          email: email,
          password: Pass,
        },
      })
      .then((response) => {
        setLoading("success");
        setTimeout(() => {
          console.log(response);
          setSlug(response.data.uploadedFileName);
          setLoader(true);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleToggle = (event) => {
    setCheck(event.target.checked);
    setPrivate(event.target.checked);
  };

  const handlepassVisibility = () => {
    setShowPass(!showPass);
  };

  const handleUpload = () => {
    fileUpload();
  };

  const UploadLayout = () => {
    return (
      <>
        <Header menu="login" />
        <div data-aos="fade-up" className={styles.main}>
          <ToastContainer />
          <div className={styles.uploadMain}>
            <div className={styles.heading}>Start Sharing a File</div>
            <div className={styles.subheading}>Simple . Fast . Beautiful</div>
            <div
              className={`${styles.upload_area} ${styles.box}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleDivClick}
            >
              <input
                style={{ display: "none" }}
                type="file"
                multiple
                onChange={handleFileInputChange}
                ref={upload}
                autoComplete="off"
              />
              <AiOutlineFileAdd size={50} color="white" />
              <div>{Text}</div>
            </div>
            <div className={styles.parentdiv} ref={Fileinfo}>
              <div className={styles.fileInfo}>
                <AiOutlineFile size={40} />
                <div className={styles.innerInfo}>
                  <div className={styles.filename}>{filename}</div>
                  <div className={styles.filesize}>{size}</div>
                </div>
                <div>
                  {isLoading === "loading" ? (
                    <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="grey"
                      barColor="black"
                    />
                  ) : isLoading === "success" ? (
                    <AiFillCheckCircle size={45} color="#24C263" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.lowerFileInfo}>
                <div className={styles.parentPassDiv}>
                  <div className={styles.passwordDiv}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className={styles.checkInput}
                      onChange={handleToggle}
                      checked={checked}
                      autoComplete="off"
                    />
                    <div className={styles.passHeading}>
                      Enable Password protection
                    </div>
                  </div>
                  {checked && (
                    <div className={passBoxClassName}>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                        type="text"
                        placeholder="Password"
                        autoComplete="new-password"
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
                  )}
                </div>
                <div className={styles.Button_Div}>
                  <div className={styles.cancel} onClick={handleInfoClose}>
                    Cancel
                  </div>
                  <div className={styles.next} onClick={handleUpload}>
                    Upload
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return isLoader ? (
    <UploadedLayout title={filename} size={size} slug={slug} />
  ) : (
    UploadLayout()
  );
};

export default Dashboard;
