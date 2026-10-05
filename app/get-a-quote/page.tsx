import React from 'react';
import Topbar from '../../components/sections/Topbar';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Quote from '../../components/sections/Quote';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = { title: pages.get_a_quote.metadata.title };

export default function GetAQuotePage() {
  const pageData = pages.get_a_quote;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="flex-1">
        <Breadcrumb
          title={pageData.title}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: pageData.pageName },
          ]}
          backgroundImage="/img/breadcrumb.png"
        />
        <Quote data={sections.get_a_quote} services={sections.services.items} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
