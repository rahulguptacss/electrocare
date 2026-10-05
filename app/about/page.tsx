import React from 'react';
import Topbar from '../../components/sections/Topbar';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import Stats from '../../components/sections/Stats';
import WhyChoose from '../../components/sections/WhyChoose';
import WorkProcess from '../../components/sections/WorkProcess';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = { title: pages.about.metadata.title };

export default function AboutPage() {
  const pageData = pages.about;

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
        <About data={sections.about} />
        <Stats data={sections.stats} />
        <WhyChoose data={sections.why_choose} />
        <WorkProcess data={sections.work_process} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
