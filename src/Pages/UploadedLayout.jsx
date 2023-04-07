import React, { useEffect, useState } from "react";
import styles from "../styles/UploadedLayout.module.css";
import { AiOutlineFile } from "react-icons/ai";
import axios from "axios";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";

const UploadedLayout = ({ title, slug, size }) => {
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
  return (
    <div className={styles.main}>
      <div className={styles.UploadLayout}>
        <div className={styles.innerLeft}>
          <div className={styles.qr}>
            <img src={qrurl} alt="" />
          </div>
        </div>
        <div className={styles.innerRight}>
          <div className={styles.upper}>
            <div className={styles.upperLeft}>
              <AiOutlineFile color="#FFFFFF" size="3.5rem" />
            </div>
            <div className={styles.upperRight}>
              <div className={styles.filetitle}>{title || "hello.mp4"}</div>
              <div className={styles.filesize}>{size || "25 MB"}</div>
            </div>
          </div>
          <div className={styles.lower}>
            <div className={styles.deletediv}>
              <MdDelete color="white" size="2rem" />
            </div>
            <div className={styles.sharediv} onClick={handleshare}>
              <FaShare color="black" size="2rem" />
            </div>
            <div className={styles.downloaddiv} onClick={handleDownload}>
              Download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedLayout;
