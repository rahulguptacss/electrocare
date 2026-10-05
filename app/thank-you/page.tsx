import React from 'react';
import Topbar from '../../components/sections/Topbar';
import Header from '../../components/sections/Header';
import ThankYou from '../../components/sections/ThankYou';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = { title: pages.thank_you.metadata.title };

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="flex flex-1 items-center justify-center py-12">
        <ThankYou data={sections.thank_you} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
