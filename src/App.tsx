/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgramsGrid from './components/ProgramsGrid';
import ProgramTimeline from './components/ProgramTimeline';
import WhySolarit from './components/WhySolarit';
import FacilityGallery from './components/FacilityGallery';
import Leadership from './components/Leadership';
import Partners from './components/Partners';
import ImpactStats from './components/ImpactStats';
import FAQ from './components/FAQ';
import EnrollContact from './components/EnrollContact';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-gray selection:bg-brand-green/30 selection:text-brand-navy font-body">
        <Navbar />
        <main>
          <Hero />
          <FadeIn><ProgramsGrid /></FadeIn>
          <FadeIn><ProgramTimeline /></FadeIn>
          <FadeIn><WhySolarit /></FadeIn>
          <FadeIn><FacilityGallery /></FadeIn>
          <FadeIn><Leadership /></FadeIn>
          <FadeIn><Partners /></FadeIn>
          <FadeIn><ImpactStats /></FadeIn>
          <FadeIn><FAQ /></FadeIn>
          <FadeIn><EnrollContact /></FadeIn>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
