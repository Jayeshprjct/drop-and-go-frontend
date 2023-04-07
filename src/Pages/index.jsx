import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { MdOutlineAddCircleOutline, MdOutlineSecurity } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { SlShare } from "react-icons/sl";
import { BsDownload } from "react-icons/bs";
import Accordion from "./Accordian";
import Lottie from "react-lottie-player";
import video from "../../public/video.mp4";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [feature, setFeature] = useState([
    {
      title: "Larger file space",
      Desc: "Shareable files are supported upto 5GB for a single file",
      icon: <MdOutlineAddCircleOutline />,
    },
    {
      title: "File Protection",
      Desc: "Shareable files can be password protected",
      icon: <MdOutlineSecurity />,
    },
    {
      title: "Privatised Files",
      Desc: "Files are auto deleted every 24 hours",
      icon: <IoLockClosed />,
    },
  ]);

  const [Faq, setFaq] = useState([
    {
      id: 1,
      title: "What is DROP-N-GO?",
      Desc: "DROP-N-GO is a platform that can be used to share files with your loved ones securely.",
    },
    {
      id: 2,
      title: "Can I secure a file while sharing?",
      Desc: "Yes!, Files that are being transferred can be secured with a passcode and can be accessed only through it.",
    },
    {
      id: 3,
      title: "What happens to files after sharing is completed?",
      Desc: "D-E-L-E-T-E-D, Files are auto deleted every 24 hours.",
    },
    {
      id: 4,
      title: "What is the file size supported?",
      Desc: "Files are supported upto 5GB & will be incremented in some time.",
    },
  ]);

  const startShare = () => {
    navigate("/login");
  };

  return (
    <>
      <Header menu="default" />
      <div className={styles.main}>
        <div className={styles.main_1}>
          <div className={styles.heading_container} data-aos="fade-up">
            <div className={styles.text_container}>Sharing Made Easier</div>
            <div className={styles.lower_text}>
              Quickly share a file with others in no time!
            </div>
            <div className={styles.start_sharing} onClick={startShare}>
              Start Sharing
            </div>
          </div>
          <div className={styles.animated_Video} data-aos="fade-up">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_qjjhj8dr.json"
              background="transparent"
              speed="1"
              style={{ height: "37rem" }}
              loop
              autoplay
            />
          </div>
        </div>
        <div className={styles.main_2}>
          {feature.map((item) => {
            return (
              <div
                key={item.title}
                className={styles.feature_box}
                data-aos="fade-up"
              >
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.feature_title}>{item.title}</div>
                <div className={styles.feature_desc}>{item.Desc}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.main_3}>
          <div className={styles.animation}>
            <lottie-player
              src="https://assets1.lottiefiles.com/packages/lf20_8Lqgc6uKHf.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
          <div className={styles.faq}>
            {Faq.map((item) => {
              return (
                <Accordion
                  key={item.id}
                  title={item.title}
                  content={item.Desc}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.progress_text}>
          Share Files Instantly with ease
        </div>
        <div className={styles.state_progress}>
          <div className={styles.SP_Item}>
            <div className={styles.Spitem}>
              <MdOutlineAddCircleOutline />
            </div>
            <div>Upload</div>
          </div>
          <div className={styles.dash}></div>
          <div className={styles.SP_Item}>
            <div className={styles.Spitem}>
              <SlShare />
            </div>
            <div>Share</div>
          </div>
          <div className={styles.dash}></div>
          <div className={styles.SP_Item}>
            <div className={styles.Spitem}>
              <BsDownload />
            </div>
            <div>Access</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
