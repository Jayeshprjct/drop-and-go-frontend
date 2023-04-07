import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../styles/Download.module.css";
import { AiOutlineFile } from "react-icons/ai";
import axios from "axios";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import Header from "./Header";
import { BiError } from "react-icons/bi";
import Loader from "./Loader";

const Download = () => {
  const slug = useParams();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const AdminId = import.meta.env.VITE_AdminId;
  const AdminPass = import.meta.env.VITE_AdminPass;
  const reqdata = `${BaseUrl}/file/download`;
  const qrurl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${reqdata}`;
  const [user, setUser] = useState("");
  const [token, settoken] = useState("");
  const [FileName, setFileName] = useState("");
  const [FileSize, setFileSize] = useState("");
  const [Loading, setLoading] = useState(true);
  const [isprivate, setprivate] = useState(true);
  const [Exist, setExist] = useState(true);

  const convertSize = (size) => {
    return Math.round(size / 1024 ** 2);
  };

  const verifyFile = () => {
    console.log("Here");
    var options = {
      method: "GET",
      url: `${BaseUrl}/file/verify`,
      params: { fileName: decodeurl(slug.slug) },
      headers: { adminId: AdminId, adminPassword: AdminPass },
    };
    axios
      .request(options)
      .then((response) => {
        setExist(true);
        setFileName(decodeurl(slug.slug));
        console.log(response.data.message);
        console.log("Here1");
        var options = {
          method: "GET",
          url: `${BaseUrl}/file/download`,
          params: { fileName: decodeurl(slug.slug) },
          headers: { fileDownloaderEmail: user },
          responseType: "blob",
        };
        axios
          .request(options)
          .then((response) => {
            setLoading(false);
            setFileSize(`${convertSize(response.data.size)} MB`);
            setLoading(false);
            setExist(true);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log("Here2");
        console.log(err);
        if (
          err.response.data.message ==
          `No file named ${decodeurl(slug.slug)} found in the database!`
        ) {
          setLoading(false);
          setExist(false);
        }
      });
  };

  const decodeurl = (slug) => {
    const replacedString = slug.replace(/\-/g, ".");
    return replacedString;
  };

  useEffect(() => {
    setUser(Cookies.get("user") != undefined ? Cookies.get("user") : "");
    settoken(Cookies.get("token") != undefined ? Cookies.get("token") : "");
    if (slug.slug != "" || undefined) {
      verifyFile();
    } else {
      console.log("error");
    }
  }, []);

  const FileNotFound = () => {
    return (
      <div className={styles.notfoundmain}>
        <div>
          <BiError size="5.5rem" color="white" />
        </div>
        <div className={styles.mainerrheading}>
          File you are trying to look is either deleted or doesn't exist!
        </div>
      </div>
    );
  };

  const handleDownload = (pass) => {
    var options = {
      method: "GET",
      url: `${BaseUrl}/file/download`,
      params: { fileName: decodeurl(slug.slug) },
      headers: { fileDownloaderEmail: user },
      responseType: "blob",
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.size);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", decodeurl(slug.slug));
        document.body.appendChild(link);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {Loading == false ? (
        <>
          {Exist ? (
            <>
              <Header />
              <div className={styles.main}>
                <div className={styles.mainHeading}>
                  Your Document is Ready <span>. Uploaded By Aditya</span>
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
                        <AiOutlineFile color="#FFFFFF" size="3.5rem" />
                      </div>
                      <div className={styles.upperRight}>
                        <div className={styles.filetitle}>
                          {FileName || "hello.mp4"}
                        </div>
                        <div className={styles.filesize}>
                          {FileSize || "25 MB"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.lower}>
                      <div className={styles.sharediv}>
                        <FaShare color="black" size="2rem" />
                      </div>
                      <div
                        className={styles.downloaddiv}
                        onClick={handleDownload}
                      >
                        Download
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            FileNotFound()
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Download;
