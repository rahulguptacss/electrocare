"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreadcrumbProps } from '../../types';

export default function Breadcrumb({
  title,
  breadcrumb,
  backgroundImage = '/img/breadcrumb.png',
}: BreadcrumbProps) {
  return (
    <section className="relative flex h-[200px] w-full items-center overflow-hidden bg-[#0b1a28] sm:h-[240px] md:h-[260px] lg:h-[280px]">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-2 text-[32px] font-extrabold leading-none text-white sm:mb-3 sm:text-[42px] lg:text-[48px]">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white sm:text-[15px]">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              return (
                <React.Fragment key={index}>
                  {item.href && !isLast ? (
                    <Link href={item.href} className="transition-colors hover:text-white/80">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                  {!isLast && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" strokeWidth={2.4} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
