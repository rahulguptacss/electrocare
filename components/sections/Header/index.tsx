"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { HeaderProps } from '../../types';

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState<Record<number, boolean>>({});

  const isLinkActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const mobileMenuVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren' },
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } },
  };

  const mobileListVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  };

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: 'easeOut' } },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div className="mx-auto hidden min-h-[76px] max-w-[1280px] items-center justify-between px-4 py-[10px] sm:px-8 lg:flex">
        <Link href="/" className="shrink-0">
          <img
            src="/logo/logo.png"
            alt={data.logo_text}
            className="h-[70px] w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-[46px]">
          {data.links?.map((link, idx) => {
            const hasDropdown = !!link.sublinks?.length;
            const active = isLinkActive(link.href);
            const hovered = hoveredIndex === idx;
            return (
              <div
                key={link.name}
                className="relative flex items-center py-1"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-[4px] text-[18px] font-extrabold transition-colors duration-200 ${
                      active || hovered ? 'text-[#1B8A3E]' : 'text-[#1f2937]'
                    }`}
                  >
                    {link.name}
                    {hasDropdown && (
                      <motion.span animate={{ rotate: hovered ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown size={15} strokeWidth={2.2} className="mt-[1px]" />
                      </motion.span>
                    )}
                    <motion.span
                      className="absolute -bottom-[10px] left-0 h-[2.5px] rounded-full bg-[#1B8A3E]"
                      initial={false}
                      animate={{ width: active || hovered ? '100%' : '0%' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  </Link>
                </motion.div>

                <AnimatePresence>
                  {hasDropdown && hovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full z-50 min-w-[230px] origin-top border-t-[3px] border-[#1B8A3E] bg-white py-2 shadow-xl"
                    >
                      {link.sublinks!.map((sub, sIdx) => (
                        <motion.div
                          key={sub.href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * sIdx, duration: 0.2 }}
                        >
                          <Link
                            href={sub.href}
                            className="block px-5 py-2.5 text-[15px] font-extrabold text-[#334155] transition-colors duration-200 hover:bg-[#1B8A3E] hover:text-white"
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={data.button_link}
            className="inline-flex h-[44px] items-center justify-center gap-[8px] rounded-full bg-[#1B8A3E] px-[28px] text-[13px] font-bold uppercase tracking-[0.6px] text-white shadow-[0_6px_16px_rgba(27,138,62,0.28)] hover:bg-[#146C31]"
          >
            {data.button_text}
            <ArrowRight size={15} strokeWidth={2.6} />
          </Link>
        </motion.div>
      </div>

      <div className="relative z-20 flex min-h-[64px] items-center justify-between gap-2 bg-white px-4 py-2 lg:hidden">
        <Link href="/" className="min-w-0 shrink">
          <img src="/logo/logo.png" alt={data.logo_text} className="h-[48px] w-auto object-contain" />
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={data.button_link}
            className="relative z-10 inline-flex h-[36px] items-center justify-center rounded-full bg-[#1B8A3E] px-3 text-[11px] font-bold uppercase tracking-[0.4px] text-white"
          >
            {data.button_text}
          </Link>
          <motion.button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.94 }}
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center p-0"
          >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X className="text-[#111827]" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex w-[22px] flex-col gap-[5px]"
              >
                <span className="h-[2px] rounded-full bg-[#111827]" />
                <span className="h-[2px] rounded-full bg-[#111827]" />
                <span className="h-[2px] rounded-full bg-[#111827]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden bg-[#06243b] lg:hidden"
          >
            <motion.nav variants={mobileListVariants} className="flex flex-col">
              {data.links?.map((link, idx) => {
                const hasDropdown = !!link.sublinks?.length;
                const isOpen = openMobileDropdowns[idx];
                return (
                  <motion.div key={link.name} variants={mobileItemVariants} className="border-b border-white/10">
                    <div className="flex items-center justify-between text-white">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-5 py-3.5 font-extrabold"
                      >
                        {link.name}
                      </Link>
                      {hasDropdown && (
                        <button
                          className="px-5 py-3.5"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMobileDropdowns((p) => ({ ...p, [idx]: !p[idx] }));
                          }}
                        >
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="block">
                            <ChevronDown size={16} />
                          </motion.span>
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {hasDropdown && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-black/20"
                        >
                          <div className="pb-2">
                            {link.sublinks!.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-8 py-2 text-white/80"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
