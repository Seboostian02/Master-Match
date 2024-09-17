import Header from "../components/Header/Header";
import AboutUsDescription from "../components/AboutUsDescription/AboutUsDescription";
import styles from "./About.module.css";
import React from "react";

export default function About() {
  return (
    <main className={styles.about}>
      <Header />
      <AboutUsDescription />
    </main>
  );
}
