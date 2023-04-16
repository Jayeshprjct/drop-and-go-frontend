import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/UploadedLayout.module.css";
import { AiOutlineCopy, AiFillFile, AiOutlineShareAlt } from "react-icons/ai";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import Cookies from "js-cookie";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadedLayout = ({ title = "hii", slug = "hii", size, password }) => {
  const encodeurl = (slug) => {
    const replacedString = slug.replace(/\./g, "-");
    return replacedString;
  };
  const FileSize = size;
  const FileName = title;
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const SiteUrl = import.meta.env.VITE_SiteUrl;
  const Requrl = `${SiteUrl}/download/${encodeurl(slug)}`;
  const qrurl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${SiteUrl}/download/${slug}`;
  const [user, setUser] = useState("");
  const [token, settoken] = useState("");
  useEffect(() => {
    setUser(Cookies.get("user") != undefined ? Cookies.get("user") : "");
    settoken(Cookies.get("token") != undefined ? Cookies.get("token") : "");
  }, []);

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
        Toast("File Downloaded", "success");
      })
      .catch((error) => console.log(error));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(Requrl);
    Toast("URL Copied", "success");
  };

  const handleDelete = () => {
    let confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
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
    }
  };
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.success}>
          <lottie-player
            src="https://assets9.lottiefiles.com/private_files/lf30_yo2zavgg.json"
            background="transparent"
            speed="1"
            style={{ width: "25rem", height: "25rem" }}
            autoplay
          />
        </div>
        <div style={{ width: "60%", height: "100%" }}>
          <div className={styles.Heading}>FILE UPLOADED</div>
          <div className={styles.UploadLayout}>
            <div className={styles.upper}>
              <div className={styles.qr}>
                <img
                  src={qrurl}
                  alt="QR"
                  draggable="false"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
              <div className={styles.upperLeft}>
                <div className={styles.title}>
                  <span>
                    <AiFillFile size="3rem" />
                  </span>
                  {FileName}
                  <span className={styles.size}>
                    {`( ` + `${FileSize}` + ` )`}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.shareDiv}>
              <div className={styles.linkBox}>
                <div title={Requrl} className={styles.linkText}>
                  {Requrl.length >= 40
                    ? Requrl.slice(0, 40) + " . . ."
                    : Requrl}
                </div>
                <div className={styles.linkCopy} onClick={handleCopy}>
                  <AiOutlineCopy size="2rem" color="white" />
                </div>
              </div>
              <div title="Share" className={styles.btnShare}>
                <AiOutlineShareAlt />
              </div>
            </div>
            <div className={styles.shareTxt}>Or download directly . . .</div>
            <div className={styles.buttonDiv}>
              <div className={styles.downloaddiv} onClick={handleDownload}>
                <div>
                  <span>
                    <MdOutlineFileDownload />
                  </span>
                  Download
                </div>
              </div>
              <div className={styles.deletediv} onClick={handleDelete}>
                <div>
                  <span>
                    <RiDeleteBinLine />
                  </span>
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadedLayout;
