import Blob from '../components/Blob'
import HeroText from '../components/HeroText'
import styles from '../style/HomePage.module.css'
import TopProvider from '../components/TopProvider'

export default function HomePage() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.halfSection}>
          <HeroText />
        </div>
        <div className={styles.halfSection}>
          <Blob />
        </div>
      </div>

      <div className="p-6">
         <h1 className="text-2xl font-semibold mb-4">Top prestataires</h1>
        <TopProvider />
      </div>
    </div>
  )
}
