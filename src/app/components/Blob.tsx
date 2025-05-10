import React from 'react';
import styles from '../style/Blob.module.css';
import myImage from '../../assets/heroImage.png';

const Blob = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blobWrapper}>
        <div className={styles.blob}></div>
        <img src={myImage.src} alt="Ma photo" className={styles.image} />
      </div>
    </div>
  );
};

export default Blob;
