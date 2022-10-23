import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "SML",
    description: <>Standard ML is a functional programming language.</>,
  },
  {
    title: "Types",
    description: <>Use types to reason about your code.</>,
  },
  {
    title: "Recursion",
    description: <>Express complex algorithms with mathematical precision.</>,
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
