import React, { useState } from "react";
import styles from "../styles/Home.module.css";

function Accordion(props) {
  const [expanded, setExpanded] = useState(false);
  const contentStyle = {
    maxHeight: expanded ? "500px" : "0",
    overflow: "hidden",
    transition: "all 0.3s ease-out",
  };

  function toggleAccordion() {
    setExpanded(!expanded);
  }

  return (
    <div onClick={toggleAccordion} className={styles.accordion}>
      <div className={styles.header}>
        <div>{props.title}</div>
        <div>{expanded ? "-" : "+"}</div>
      </div>
      {expanded && (
        <div className={styles.content} style={contentStyle}>
          {props.content}
        </div>
      )}
    </div>
  );
}

export default Accordion;
