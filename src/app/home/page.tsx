import Blob from '../components/Blob';
import HeroText from '../components/HeroText';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' , background: 'linear-gradient(to bottom right, #F5F5F4, #EAEAEA)'}}>
      <div style={{ flex: 1 }}>
        <HeroText />
      </div>
      <div style={{ flex: 1 }}>
        <Blob />
      </div>
    </div>
  );
}
