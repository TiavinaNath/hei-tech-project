import Blob from '../../components/ui/Blob'
import HeroText from '../../components/ui/HeroText'
import styles from '../style/HomePage.module.css'
import ServicesSlider from '../../components/features/accueil/ServicesSlider'

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
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Services</h1>
        <ServicesSlider />
      </div>
    </div>
  )
}
