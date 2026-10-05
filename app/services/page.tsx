import React from 'react';
import Topbar from '../../components/sections/Topbar';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Services from '../../components/sections/Services';
import Stats from '../../components/sections/Stats';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = { title: pages.services.metadata.title };

export default function ServicesPage() {
  const pageData = pages.services;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb
          title={pageData.title}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: pageData.pageName },
          ]}
          backgroundImage="/img/breadcrumb.png"
        />
        <Services data={sections.services} isGrid itemsPerPage={8} showPagination />
        <Stats data={sections.stats} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
