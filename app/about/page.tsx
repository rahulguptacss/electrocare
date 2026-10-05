import React from 'react';
import Topbar from '../../components/sections/Topbar';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import PageSections from '../../components/PageSections';
import { common, pages } from '../../components/types';

export const metadata = { title: pages.about.metadata.title };

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <PageSections page={pages.about} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
