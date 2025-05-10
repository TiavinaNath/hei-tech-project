import React from 'react';
import styles from '../style/HeroText.module.css';

const HeroText = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles["hero-title"]}>
      <span>
        Plus de galère,<br />
        ton <span className={styles.highlight}>prestataire</span> gère
      </span>
      </h1>
      <p className={styles["hero-subtitle"]}>
        Using our app you can manage your team and upgrade <br />
        your team to the next level
      </p>
      <div className={styles["search-section"]}>
        <input type="search" placeholder="search here" />
        <button>Allons-y</button>
      </div>
    </section>
  );
};

export default HeroText;
