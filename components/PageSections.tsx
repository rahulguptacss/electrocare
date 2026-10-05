import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import WhyChoose from './sections/WhyChoose';
import WorkProcess from './sections/WorkProcess';
import Breadcrumb from './sections/Breadcrumb';
import Contact from './sections/Contact';
import Quote from './sections/Quote';
import PhotoGallery from './sections/PhotoGallery';
import ThankYou from './sections/ThankYou';
import ServiceDetails from './sections/ServiceDetails';
import { PageComponentRef, PageMeta, sections } from './types';

const registry: Record<string, React.ComponentType<any>> = {
  Hero,
  About,
  Services,
  Stats,
  Testimonials,
  WhyChoose,
  WorkProcess,
  Breadcrumb,
  Contact,
  Quote,
  PhotoGallery,
  ThankYou,
  ServiceDetails,
};

function sectionProps(
  item: PageComponentRef,
  page: PageMeta,
  extra?: Record<string, any>
) {
  switch (item.component) {
    case 'Hero':
      return { data: sections.hero };
    case 'About':
      return { data: sections.about };
    case 'Services':
      return item.key === 'ServicesGridSection'
        ? { data: sections.services, isGrid: true, itemsPerPage: 8, showPagination: true }
        : { data: sections.services, isGrid: false, showPagination: false };
    case 'Stats':
      return { data: sections.stats };
    case 'Testimonials':
      return { data: sections.testimonials };
    case 'WhyChoose':
      return { data: sections.why_choose };
    case 'WorkProcess':
      return { data: sections.work_process };
    case 'Breadcrumb':
      return extra?.breadcrumb
        ? {
            title: extra.breadcrumbTitle || page.title,
            breadcrumb: extra.breadcrumb,
            backgroundImage: '/img/breadcrumb.png',
          }
        : {
            title: page.title,
            breadcrumb: [{ label: 'Home', href: '/' }, { label: page.pageName }],
            backgroundImage: '/img/breadcrumb.png',
          };
    case 'Contact':
      return { data: sections.contact, services: sections.services.items };
    case 'Quote':
      return { data: sections.get_a_quote, services: sections.services.items };
    case 'PhotoGallery':
      return { data: sections.photo_gallery };
    case 'ThankYou':
      return { data: sections.thank_you };
    case 'ServiceDetails':
      return extra?.serviceDetails || {};
    default:
      return {};
  }
}

export default function PageSections({
  page,
  extra,
}: {
  page: PageMeta;
  extra?: Record<string, any>;
}) {
  return (
    <>
      {(page.components || []).map((item) => {
        const Cmp = registry[item.component];
        if (!Cmp) return null;
        return <Cmp key={item.key} {...sectionProps(item, page, extra)} />;
      })}
    </>
  );
}
