import React, { useState } from "react";
import styles from "./Hidden.module.css";

function flip(x) {
  return !x;
}

export function Hidden(props) {
  const [shown, setShown] = useState(false);
  return (
    <div className={styles.hidden}>
      <div>
        <button
          className="button button--secondary"
          onClick={() => setShown(flip)}
        >
          {shown ? "Hide" : "Show"}
        </button>
      </div>
      {shown ? props.children : null}
    </div>
  );
}
