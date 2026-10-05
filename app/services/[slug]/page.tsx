import React from 'react';
import Topbar from '../../../components/sections/Topbar';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import PageSections from '../../../components/PageSections';
import { common, pages, sections, toSlug, ServiceDetailsData } from '../../../components/types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return sections.services.items.map((item) => ({ slug: toSlug(item.title) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = sections.services.items.find((item) => toSlug(item.title) === slug);
  if (!service) return { title: 'Service Not Found' };
  return { title: `ElectroCare - ${service.title}` };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = pages.service_details;
  const items = sections.services.items;
  const activeService = items.find((item) => toSlug(item.title) === slug);
  if (!activeService) notFound();

  const detailsData = sections.service_details.find(
    (sd) => sd.slug === slug || toSlug(sd.title) === slug
  );

  const title = detailsData?.title || activeService.title;
  const titleWords = title.split(' ');

  const serviceData: ServiceDetailsData = {
    title,
    description: detailsData?.description || activeService.description,
    image: activeService.image || '/services/service-01.png',
    icon: activeService.icon,
    subtitle: detailsData?.subtitle,
    badge: detailsData?.badge || 'PROFESSIONAL',
    overlay_line1: detailsData?.overlay_line1 || titleWords[0],
    overlay_highlight: detailsData?.overlay_highlight || titleWords.slice(1).join(' '),
    overlay_tagline: detailsData?.overlay_tagline || 'Safe Solutions for a Brighter Tomorrow',
    content_blocks: detailsData?.content_blocks,
    benefits: [],
    process: [],
    gallery: [],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <PageSections
          page={pageData}
          extra={{
            breadcrumbTitle: pageData.title,
            breadcrumb: [
              { label: 'Home', href: '/' },
              { label: pageData.pageName },
            ],
            serviceDetails: {
              data: serviceData,
              allServices: items,
              sidebarData: sections.services.sidebar,
            },
          }}
        />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
