"use client";

import React from 'react';
import Link from 'next/link';
import Topbar from '../components/sections/Topbar';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { common, pages } from '../components/types';

export default function NotFound() {
  const pageData = pages.not_found;
  const code = pageData.code || '404';
  const c1 = code[0] || '4';
  const c2 = code[1] || '0';
  const c3 = code.slice(2) || '4';

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Topbar data={common.Topbar} />
      <Header data={common.Header} />
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">
        <div className="text-[100px] font-black leading-none text-[#0b2540]">
          {c1}<span className="text-[#1B8A3E]">{c2}</span>{c3}
        </div>
        <h1 className="text-[32px] font-black mt-4 text-[#0b2540]">{pageData.heading}</h1>
        <p className="text-[#64748b] max-w-lg mt-3 mb-6">{pageData.description}</p>
        <Link href={pageData.button_href || '/'} className="bg-[#1B8A3E] text-white font-bold px-6 py-3 rounded-md hover:bg-[#146C31] transition-colors">{pageData.button_text}</Link>
      </main>
      <Footer data={common.Footer} />
    </div>
  );
}
