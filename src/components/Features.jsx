import clsx from "clsx";
import React from "react";
import styles from "./Features.module.css";

const FeatureList = [
  {
    title: "Functions",
    description: (
      <>
        Standard ML (SML) is a functional programming language. Functions are
        the unit of abstraction.
      </>
    ),
  },
  {
    title: "Types",
    description: (
      <>
        SML has rich static types and type inference. Type errors never occur at
        runtime.
      </>
    ),
  },
  {
    title: "Recursion",
    description: (
      <>
        Express complex algorithms with concise recursive formulations. Then
        prove them correct with induction.
      </>
    ),
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

export function Features() {
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
