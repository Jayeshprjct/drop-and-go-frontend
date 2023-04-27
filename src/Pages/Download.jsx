import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Download.module.css";
import Popup from "./Popup";
import {
  AiOutlineEye,
  AiFillFile,
  AiOutlineEyeInvisible,
  AiOutlineUser,
  AiOutlineCopy,
} from "react-icons/ai";
import axios from "axios";
import { FaShare } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import Cookies from "js-cookie";
import Header from "./Header";
import { BiError } from "react-icons/bi";
import { HiOutlineDownload, HiLockClosed } from "react-icons/hi";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Download = () => {
  const SiteUrl = import.meta.env.VITE_SiteUrl;
  const { slug } = useParams();
  const Dnload = useRef();
  const Requrl = `${SiteUrl}/download/${slug}`;
  const popupBox = useRef();
  const dnloadText = useRef();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const txtbox = useRef(null);
  const DnIcon = useRef();
  const AdminId = import.meta.env.VITE_AdminId;
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const AdminPass = import.meta.env.VITE_AdminPass;
  const [qrurl, setQrUrl] = useState("");
  const [user, setUser] = useState("");
  const [token, settoken] = useState("");
  const [FileName, setFileName] = useState("");
  const [FileOwner, setFileOwner] = useState("");
  const [FileSize, setFileSize] = useState("");
  const [uploadDate, setuploadDate] = useState("");
  const [getPass, setgetPass] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(true);
  const [isDownLoaded, setDownLoaded] = useState("false");
  const [Progress, setProgress] = useState(0);
  const [isprivate, setprivate] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [toggleeye, settoggleEye] = useState(false);
  const [Exist, setExist] = useState(true);
  const [state, setState] = useState("default");

  console.log(windowSize.current[0]);

  const handlepassVisibility = () => {
    settoggleEye(!toggleeye);
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

  function bytesToMB(bytes) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  }

  const handleshare = () => {
    navigator.clipboard.writeText(`${SiteUrl}/download/${slug}`);
    Toast("Share Link Copied!", "success");
  };

  const verifyFile = () => {
    var options = {
      method: "GET",
      url: `${BaseUrl}/file/verify`,
      params: { fileName: decodeurl(slug) },
      headers: { adminId: AdminId, adminPassword: AdminPass },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response);
        setExist(true);
        setLoading(false);
        setQrUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${SiteUrl}/download/${slug}`
        );
        setFileSize(`${bytesToMB(response.data.verifiedFile.fileSize)}`);
        setFileOwner(response.data.verifiedFile.uploadedBy);
        setuploadDate(formatDate(response.data.verifiedFile.uploadedOn));
        setFileName(response.data.verifiedFile.displayName);
        setprivate(response.data.verifiedFile.isPrivate);
        setgetPass(response.data.verifiedFile.filePassword);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.message ==
          `No file named ${decodeurl(slug)} found in the database!`
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

  const fileName = "hii.hii";
  const urlSegment = encodeURIComponent(fileName);
  const downloadUrl = `/download/${urlSegment}`;

  useEffect(() => {
    setTimeout(() => {
      setUser(
        Cookies.get("user") != undefined
          ? Cookies.get("user")
          : "default@gmail.com"
      );
      settoken(Cookies.get("token") != undefined ? Cookies.get("token") : "");
      if (slug != "" && slug != undefined) {
        verifyFile();
      } else {
        console.log(slug);
        setExist(false);
        setLoading(false);
      }
    }, 1000);
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

  function formatDate(timestamp) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${day}${getOrdinalSuffix(day)} ${month}, ${year} ${
      hours % 12
    }:${padZero(minutes)} ${ampm}`;

    return formattedTime;
  }

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

  const CheckPrivateFile = () => {
    ProgressProps();
    let options = {
      method: "GET",
      url: `${BaseUrl}/file/download`,
      params: { fileName: decodeurl(slug) },
      headers: {
        filePassword: password,
        fileDownloaderEmail: user,
      },
      responseType: "blob",
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", decodeurl(slug));
        document.body.appendChild(link);
        link.click();
        CompletedProps();
        setPassword("");
        setShowPass(false);
      })
      .catch((error) => {
        console.log(error);
        // console.log(error.response.message);
        if (error.response.data.message == "Incorrect file password") {
          console.log("Incorrect Password");
          Toast("Incorrect File Password", "error");
          ResetProps();
        }
      });
  };

  const ResetProps = () => {
    Dnload.current.style.backgroundColor = "#ffffff";
    Dnload.current.style.color = "#2a2a2a";
    dnloadText.current.innerText = "Download";
    setDownLoaded("false");
  };

  const ProgressProps = () => {
    Dnload.current.style.backgroundColor = "#ffeba8";
    Dnload.current.style.color = "#2a2a2a";
    dnloadText.current.innerText = "Downloading";
    setDownLoaded("progress");
  };

  const CompletedProps = () => {
    Dnload.current.style.backgroundColor = "#f3f3f3";
    Dnload.current.style.color = "#1f1f1f";
    dnloadText.current.innerText = "Downloaded";
    setDownLoaded("true");

    // setTimeout(() => {
    //   ResetProps();
    // }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${SiteUrl}/download/${slug}`);
    Toast("Share Link Copied!", "success");
  };

  const handleDownload = () => {
    if (!isprivate) {
      ProgressProps();
      var options = {
        method: "GET",
        url: `${BaseUrl}/file/download`,
        params: { fileName: decodeurl(slug) },
        headers: {
          fileDownloaderEmail: user,
        },
        responseType: "blob",
      };
      axios
        .request(options)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", decodeurl(slug));
          document.body.appendChild(link);
          link.click();
          CompletedProps();
          console.log(Progress);
        })
        .catch((error) => console.log(error));
    } else {
      setShowPass(true);
    }
  };

  const handleProtectedDownload = () => {
    if (password == getPass) {
      CheckPrivateFile();
      console.log("protected Download started");
    } else {
      Toast("Invalid Password", "error");
    }
  };

  const Passbox = () => {
    return (
      <div ref={popupBox} className={styles.passboxMain}>
        <div className={styles.passcontainer}>
          <div className={styles.passHeading}>File is password protected</div>
          <div className={styles.pass_box}>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="new-password"
              value={password}
              type={toggleeye === true ? "text" : "password"}
              placeholder="Password"
            />
            <div
              className={styles.show_pass}
              onClick={() => handlepassVisibility()}
            >
              {toggleeye === true ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </div>
          </div>
          <div className={styles.passButtons}>
            <div
              className={styles.download}
              onClick={handleProtectedDownload}
              ref={Dnload}
            >
              <span style={{ marginRight: "1rem" }} ref={DnIcon}>
                {isDownLoaded === "true" ? (
                  <MdOutlineDownloadDone size="2rem" />
                ) : isDownLoaded === "progress" ? (
                  <span className={styles.loader} />
                ) : (
                  <HiOutlineDownload size="2rem" />
                )}
              </span>
              <div ref={dnloadText}>Download</div>
            </div>
            <div
              className={styles.cancel}
              onClick={() => {
                setShowPass(false);
                setPassword("");
                settoggleEye(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {Loading == false ? (
        <>
          {Exist ? (
            <>
              {showpass && Passbox()}
              {isDownLoaded == "true" && (user == undefined || user == "") ? (
                <Popup />
              ) : (
                ""
              )}
              <Header />
              <div className={styles.main}>
                <div className={styles.success}></div>
                <div className={styles.mainContainer}>
                  <div className={styles.Heading}>FILE RETRIEVED</div>
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
                            <AiFillFile className={styles.Icon} />
                          </span>
                          {FileName}
                          {isprivate && (
                            <span className={styles.lock}>
                              <HiLockClosed
                                title="Private file"
                                size="2rem"
                                color="white"
                              />
                            </span>
                          )}
                          {windowSize.current[0] >= 800 ? (
                            <span
                              className={styles.size}
                            >{`( ${FileSize} )`}</span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.ownerName}>
                          <span>
                            <AiOutlineUser className={styles.Icon} />
                          </span>
                          {`~ By ` + `${FileOwner}` + ` on ${uploadDate}`}
                        </div>
                        <div className={styles.ownerName1}>
                          <span>
                            <AiOutlineUser className={styles.Icon} />
                          </span>
                          {`By ${FileOwner}`}
                        </div>
                      </div>
                    </div>
                    <div className={styles.linkBox}>
                      <div
                        title={Requrl}
                        ref={txtbox}
                        className={styles.linkText}
                      >
                        {Requrl.length >= 50
                          ? Requrl.slice(0, 50) + " . . ."
                          : Requrl}
                      </div>
                      <div className={styles.linkCopy} onClick={handleCopy}>
                        <AiOutlineCopy size="2rem" color="white" />
                      </div>
                    </div>
                    <div className={styles.shareTxt}>
                      Or download directly . . .
                    </div>
                    <div className={styles.buttonDiv}>
                      <div
                        className={styles.downloaddiv}
                        onClick={handleDownload}
                        ref={Dnload}
                      >
                        <span style={{ marginRight: "1rem" }} ref={DnIcon}>
                          {isDownLoaded === "true" ? (
                            <MdOutlineDownloadDone size="2rem" />
                          ) : isDownLoaded === "progress" ? (
                            <span className={styles.loader} />
                          ) : (
                            <HiOutlineDownload size="2rem" />
                          )}
                        </span>
                        <div ref={dnloadText}>Download</div>
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
