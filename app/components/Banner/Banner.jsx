import React from "react";
// import { getImageUrl } from "../../utils";
import styles from "../Banner/Banner.module.css";

const Banner = (props) => {
  let userDetails = props.data;
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm {userDetails.name}</h1>
        <h3 className={styles.headline}>{userDetails.headline}</h3>
        <p className={styles.intro}>{userDetails.intro}</p>
        <a href="#" className={styles.contactBtn}>
          Contact me
        </a>
      </div>
      <img src="#" alt="Profile-Image" className={styles.profileImg} />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

export default Banner;
