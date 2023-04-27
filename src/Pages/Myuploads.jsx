import React, { useEffect, useState } from "react";
import styles from "../styles/Myuploads.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import {
  AiFillFile,
  AiFillLock,
  AiFillDelete,
  AiFillCopy,
} from "react-icons/ai";

import { TbHourglassEmpty } from "react-icons/tb";
import { FaLock } from "react-icons/fa";

import { HiOutlineDownload } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myuploads = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const SiteUrl = import.meta.env.VITE_SiteUrl;
  const AdminId = import.meta.env.VITE_AdminId;
  const AdminPass = import.meta.env.VITE_AdminPass;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [EmptyList, setEmptyList] = useState(false);
  const [fileLength, setfileLength] = useState(0);
  const [fileInfo, setFileInfo] = useState([]);

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

  useEffect(() => {
    if (Cookies.get("user") == undefined || Cookies.get("user") == "") {
      navigate("/login");
    } else {
      const email = Cookies.get("user");
      setEmail(email);
      const token = Cookies.get("token");
      setPass(token);
    }
  }, []);

  useEffect(() => {
    if (email != "" && pass != "") {
      renderData();
    }
  }, [email, pass]);

  const renderData = () => {
    let options = {
      method: "GET",
      url: `${BaseUrl}/account/uploadedFiles`,
      params: { email: email },
      headers: { adminId: AdminId, adminPassword: AdminPass },
    };
    axios
      .request(options)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        if (res.data.length == 0) {
          setEmptyList(true);
        } else {
          setFileInfo(res.data);
          setfileLength(res.data.length);
          setEmptyList(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDeleteConfirm = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      // delete the item
    } else {
      // do nothing
    }
  };

  const encodeurl = (slug) => {
    const replacedString = slug.replace(/\./g, "-");
    return replacedString;
  };

  function bytesToMB(bytes) {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  }

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

  const handleDownload = (displayname, filename, pass) => {
    console.log(filename);
    console.log(pass);
    var options = {
      method: "GET",
      url: `${BaseUrl}/file/download`,
      params: { fileName: filename },
      headers: { fileDownloaderEmail: email, filePassword: pass },
      responseType: "blob",
    };
    axios
      .request(options)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", displayname);
        document.body.appendChild(link);
        link.click();
        Toast("Downloaded Successfully", "success");
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (filename) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      var options = {
        method: "DELETE",
        url: `${BaseUrl}/file/delete`,
        params: { fileName: filename },
        headers: { email: email, password: pass },
      };
      axios
        .request(options)
        .then((response) => {
          if (response.data.deleted == true) {
            Toast("Deleted successfully", "success");
            renderData();
          }
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleShare = (filename) => {
    navigator.clipboard.writeText(`${SiteUrl}/download/${encodeurl(filename)}`);
    Toast("Sharing URL copied Successfully", "success");
  };

  const NoItems = () => {
    return (
      <div className={styles.mainEmpty}>
        <TbHourglassEmpty size="8rem" color="white" />
        <div className={styles.EmptyHeading}>No files Shared</div>
        <div className={styles.emptysubheading}>
          Uploaded files will be shown here
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading == false ? (
        <>
          <Header menu="login" />
          <div className={styles.main}>
            {EmptyList == false ? (
              <>
                <div className={styles.heading}>
                  My Uploaded Files<span>{`(${fileLength})`}</span>
                </div>
                <div className={styles.filecontainer}>
                  {fileInfo.map((item) => {
                    return (
                      <div key={item.id} className={styles.file}>
                        <div className={styles.upperdiv}>
                          <div className={styles.upperleft}>
                            <AiFillFile size="2.5rem" color="#2d2d2d" />
                          </div>
                          <div className={styles.upperright}>
                            <div
                              className={styles.fileHeading}
                              title={item.displayName}
                            >
                              {item.displayName.length >= 18
                                ? item.displayName.slice(0, 18) + " . . ."
                                : item.displayName}
                            </div>
                            <div className={styles.fileSize}>
                              {bytesToMB(item.fileSize)} .{" "}
                              <span>{formatDate(item.uploadedOn)}</span>
                            </div>
                          </div>
                          <div>
                            {item.isPrivate ? (
                              <FaLock
                                title="Private File"
                                size="1.2rem"
                                color="#3b3b3b"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className={styles.lowerdiv}>
                          <div className={styles.buttonDiv}>
                            <div
                              className={styles.delete}
                              onClick={() => handleDelete(item.actualName)}
                              title="Delete File"
                            >
                              <AiFillDelete size="1.8rem" color="white" />
                            </div>
                            <div
                              className={styles.share}
                              title="Copy URL"
                              onClick={() => {
                                handleShare(item.actualName);
                              }}
                            >
                              <MdContentCopy size="1.8rem" color="#2d2d2d" />
                            </div>
                            <div
                              className={styles.download}
                              onClick={() => {
                                handleDownload(
                                  item.displayName,
                                  item.actualName,
                                  item.filePassword
                                );
                              }}
                              title="Download File"
                            >
                              <HiOutlineDownload
                                size="1.8rem"
                                color="#2d2d2d"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              NoItems()
            )}
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Myuploads;
