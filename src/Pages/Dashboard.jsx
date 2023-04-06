import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "../styles/Dashboard.module.css";
import UploadComp from "./UploadComp";

const Dashboard = () => {
  return (
    <div>
      <Header menu="false" />
      <div className={styles.main}>
        <UploadComp />
      </div>
    </div>
  );
};

export default Dashboard;
