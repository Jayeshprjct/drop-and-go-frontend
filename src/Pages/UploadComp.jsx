import React, { useRef, useState } from "react";
import styles from "../styles/UploadComp.module.css";
import {
  AiOutlineFile,
  AiFillCheckCircle,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { ProgressBar } from "react-loader-spinner";

const UploadComp = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState("");
  const [size, setSize] = useState("");
  const upload = useRef();
  const Fileinfo = useRef();
  const [isLoading, setLoading] = useState(false);
  const handleUpload = () => {};
  const handleCancel = () => {};

  function handleDrop(event) {
    event.preventDefault();
    const newFiles = [...files];
    for (const file of event.dataTransfer.files) {
      newFiles.push(file);
      console.log(file);
      setFile(file.name);
      setSize(
        (convertSize(file.size) <= 0 ? 1 : convertSize(file.size)) + " MB"
      );
    }
    setFiles(newFiles);
  }

  const convertSize = (size) => {
    return Math.round(size / 1024 ** 2);
  };

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleFileInputChange(event) {
    Fileinfo.current.style.display = "flex";
    const newFiles = [...files];
    for (const file of event.target.files) {
      newFiles.push(file);
      setFile(file.name);
      setSize(
        (convertSize(file.size) <= 0 ? 1 : convertSize(file.size)) + " MB"
      );
    }
    setFiles(newFiles);
  }

  const handleInfoClose = () => {
    Fileinfo.current.style.display = "none";
  };

  const handleDivClick = () => {
    upload.current.click();
  };

  return (
    <div className={styles.main}>
      <div className={styles.uploadMain}>
        <div className={styles.heading}>Upload A File</div>
        <div
          className={styles.upload_area}
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
          />
          <AiOutlineFileAdd size={50} color="white" />
          <div>Drag and Drop file here or Choose file</div>
        </div>
        <div
          className={styles.fileInfo}
          style={{ display: "none" }}
          ref={Fileinfo}
        >
          <AiOutlineFile size={40} />
          <div className={styles.innerInfo}>
            <div className={styles.filename}>{file}</div>
            <div className={styles.filesize}>{size}</div>
          </div>
          <div>
            {isLoading == true ? (
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="grey"
                barColor="black"
              />
            ) : (
              <AiFillCheckCircle size={45} color="#24C263" />
            )}
          </div>
        </div>
        <div className={styles.Button_Div}>
          <div className={styles.cancel} onClick={handleInfoClose}>
            Cancel
          </div>
          <div className={styles.next} onClick={handleUpload}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadComp;
