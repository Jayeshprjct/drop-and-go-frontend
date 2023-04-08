import React, { useEffect, useState } from "react";
import styles from "../styles/UploadedLayout.module.css";
import { AiOutlineFile, AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadedLayout = ({ title, slug, size, password }) => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const reqdata = `${BaseUrl}/file/download`;
  const qrurl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${reqdata}`;
  const [user, setUser] = useState("");
  const [token, settoken] = useState("");
  useEffect(() => {
    setUser(Cookies.get("user") != undefined ? Cookies.get("user") : "");
    settoken(Cookies.get("token") != undefined ? Cookies.get("token") : "");
  }, []);

  const encodeurl = (slug) => {
    const replacedString = slug.replace(/\./g, "-");
    const encodedUrl = "/download/" + replacedString;
    return encodedUrl;
  };

  const handleshare = () => {
    console.log(encodeurl(slug));
    // window.open(encodeurl(slug));
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

  const handleDownload = (pass) => {
    var options = {
      method: "GET",
      url: `${BaseUrl}/file/download`,
      params: { fileName: slug },
      headers: { fileDownloaderEmail: user },
      responseType: "blob",
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", slug);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    var options = {
      method: "DELETE",
      url: `${BaseUrl}/file/delete`,
      params: { fileName: slug },
      headers: { email: user, password: token },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.data.deleted == true) {
          Toast("Deleted successfully", "success", 1000);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <div className={styles.main}>
        <div className={styles.successHeading}>
          <AiFillCheckCircle color="#00fe11" size="2rem" />
          <span style={{ marginLeft: "0.7rem" }}>
            File uploaded successfully
          </span>
        </div>
        <div className={styles.UploadLayout}>
          <div className={styles.innerLeft}>
            <div className={styles.qr}>
              <img src={qrurl} alt="" />
            </div>
          </div>
          <div className={styles.innerRight}>
            <div className={styles.upper}>
              <div className={styles.upperLeft}>
                <BsFillFileEarmarkCheckFill color="#FFFFFF" size="3rem" />
              </div>
              <div className={styles.upperRight}>
                <div className={styles.filetitle}>{title || "hello.mp4"}</div>
                <div className={styles.filesize}>{size || "25 MB"}</div>
              </div>
            </div>
            <div className={styles.lower}>
              <div className={styles.deletediv} onClick={handleDelete}>
                <MdDelete color="white" size="2rem" />
              </div>
              <div className={styles.sharediv} onClick={handleshare}>
                <FaShare color="#7a7a7a" size="2rem" />
              </div>
              <div className={styles.downloaddiv} onClick={handleDownload}>
                Download
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadedLayout;
