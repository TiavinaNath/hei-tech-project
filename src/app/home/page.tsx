'use client';

import { useState } from 'react';
import Blob from '../../components/ui/Blob';
import HeroText from '../../components/ui/HeroText';
import styles from '../style/HomePage.module.css';
import ServiceModal from '../../components/features/service/ServiceModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.halfSection}>
          <HeroText onOpenModal={() => setIsModalOpen(true)} />
        </div>
        <div className={styles.halfSection}>
          <Blob />
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Top prestataires</h1>
      </div>

      <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
