/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgramsGrid from './components/ProgramsGrid';
import WhySolarit from './components/WhySolarit';
import FacilityGallery from './components/FacilityGallery';
import Leadership from './components/Leadership';
import Partners from './components/Partners';
import ImpactStats from './components/ImpactStats';
import EnrollContact from './components/EnrollContact';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-gray selection:bg-brand-green/30 selection:text-brand-navy">
        <Navbar />
        <main>
          <Hero />
          <ProgramsGrid />
          <WhySolarit />
          <FacilityGallery />
          <Leadership />
          <Partners />
          <ImpactStats />
          <EnrollContact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
