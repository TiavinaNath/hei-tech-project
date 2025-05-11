import Blob from '../components/Blob';
import HeroText from '../components/HeroText';
import styles from '../style/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.halfSection}>
        <HeroText />
      </div>
      <div className={styles.halfSection}>
        <Blob />
      </div>
    </div>
  );
}