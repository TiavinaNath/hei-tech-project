import React from 'react';
import styles from '@/app/style/Blob.module.css';
import myImage from '../../assets/heroImage.png';

const Blob = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blobWrapper}>
        <div className={styles.blob}></div>
        <img src={myImage.src} alt="Ma photo" className={styles.image} />

        <div className={styles.infoBoxTopLeft}>
          <h4>Prestataires inscrits</h4>
          <p>120+ Experts</p>
        </div>

        <div className={styles.infoBoxBottomLeft}>
          <h4>Projets réalisés</h4>
          <p>450+ Missions</p>
        </div>

        <div className={styles.infoBoxTopRight}>
          <h4>Délai moyen</h4>
          <p>&lt; 24h</p>
        </div>

        <div className={styles.infoBoxBottomRight}>
          <h4>Avis clients</h4>
          <p>4.9⭐ Note</p>
        </div>
      </div>
    </div>
  );
};

export default Blob;
