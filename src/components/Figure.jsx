import React from "react";
import styles from "./Figure.module.css";

export function Figure(props) {
  return (
    <figure className={styles.center}>
      {props.figure ? props.figure : <img src={props.img} alt={props.alt} />}
      <figcaption>
        <b>Fig {props.idx}.</b> {props.children}
      </figcaption>
    </figure>
  );
}
