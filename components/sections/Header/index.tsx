"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronRight, X } from 'lucide-react';
import { HeaderProps, LinkType } from '../../types';

// Helper to access sublinks or children consistently
const getChildren = (item: LinkType): LinkType[] => item.sublinks || item.children || [];
const hasChildren = (item: LinkType): boolean => getChildren(item).length > 0;

/** Desktop Submenu Item — handles standard item, Level 2 nested flyout, and Level 3 flyout */
function DesktopSubmenuItem({
  item,
  openToLeft,
  isActive,
}: {
  item: LinkType;
  openToLeft: boolean;
  isActive: (item: LinkType) => boolean;
}) {
  const children = getChildren(item);
  const hasSubDropdown = children.length > 0;
  const active = isActive(item);

  if (!hasSubDropdown) {
    return (
      <Link
        href={item.href}
        className={`block px-5 py-2.5 text-[15px] font-extrabold transition-colors duration-200 ${
          active
            ? 'bg-[#1B8A3E] text-white'
            : 'text-[#334155] hover:bg-[#1B8A3E] hover:text-white'
        }`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="group/sub relative">
      <Link
        href={item.href}
        className={`flex w-full items-center justify-between gap-3 px-5 py-2.5 text-[15px] font-extrabold transition-colors duration-200 group-hover/sub:bg-[#1B8A3E] group-hover/sub:text-white ${
          active ? 'bg-[#1B8A3E]/10 text-[#1B8A3E]' : 'text-[#334155]'
        }`}
      >
        <span className="truncate">{item.name}</span>
        <ChevronRight
          size={15}
          strokeWidth={2.4}
          className={`shrink-0 transition-transform duration-200 ${
            openToLeft ? 'rotate-180 group-hover/sub:-translate-x-1' : 'group-hover/sub:translate-x-1'
          }`}
        />
      </Link>

      {/* Level 2 Submenu Flyout (Dropdown inside Dropdown) */}
      <div
        className={`pointer-events-none absolute ${
          openToLeft ? 'right-full pr-1.5' : 'left-full pl-1.5'
        } top-0 z-50 min-w-[220px] opacity-0 ${
          openToLeft ? 'translate-x-2' : '-translate-x-2'
        } transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 before:absolute before:inset-y-0 ${
          openToLeft ? 'before:-right-3' : 'before:-left-3'
        } before:w-3 before:content-['']`}
      >
        <div className="border-t-[3px] border-[#1B8A3E] bg-white py-2 shadow-2xl border-x border-b border-gray-100 rounded-b-md">
          {children.map((nested, nIdx) => {
            const nestedChildren = getChildren(nested);
            const hasNestedDropdown = nestedChildren.length > 0;
            const nestedActive = isActive(nested);

            if (!hasNestedDropdown) {
              return (
                <Link
                  key={nested.name + nested.href + nIdx}
                  href={nested.href}
                  className={`block px-5 py-2.5 text-[14.5px] font-extrabold transition-colors duration-200 ${
                    nestedActive
                      ? 'bg-[#1B8A3E] text-white'
                      : 'text-[#334155] hover:bg-[#1B8A3E] hover:text-white'
                  }`}
                >
                  {nested.name}
                </Link>
              );
            }

            // Level 3 nested dropdown flyout
            return (
              <div key={nested.name + nested.href + nIdx} className="group/nested relative">
                <Link
                  href={nested.href}
                  className={`flex w-full items-center justify-between gap-3 px-5 py-2.5 text-[14.5px] font-extrabold transition-colors duration-200 group-hover/nested:bg-[#1B8A3E] group-hover/nested:text-white ${
                    nestedActive ? 'bg-[#1B8A3E]/10 text-[#1B8A3E]' : 'text-[#334155]'
                  }`}
                >
                  <span className="truncate">{nested.name}</span>
                  <ChevronRight
                    size={14}
                    strokeWidth={2.4}
                    className={`shrink-0 transition-transform duration-200 ${
                      openToLeft ? 'rotate-180 group-hover/nested:-translate-x-1' : 'group-hover/nested:translate-x-1'
                    }`}
                  />
                </Link>

                <div
                  className={`pointer-events-none absolute ${
                    openToLeft ? 'right-full pr-1.5' : 'left-full pl-1.5'
                  } top-0 z-50 min-w-[200px] opacity-0 ${
                    openToLeft ? 'translate-x-2' : '-translate-x-2'
                  } transition-all duration-200 group-hover/nested:pointer-events-auto group-hover/nested:opacity-100 group-hover/nested:translate-x-0 before:absolute before:inset-y-0 ${
                    openToLeft ? 'before:-right-3' : 'before:-left-3'
                  } before:w-3 before:content-['']`}
                >
                  <div className="border-t-[3px] border-[#1B8A3E] bg-white py-2 shadow-2xl border-x border-b border-gray-100 rounded-b-md">
                    {nestedChildren.map((subNested, snIdx) => (
                      <Link
                        key={subNested.name + subNested.href + snIdx}
                        href={subNested.href}
                        className={`block px-5 py-2 text-[14px] font-extrabold transition-colors duration-200 ${
                          isActive(subNested)
                            ? 'bg-[#1B8A3E] text-white'
                            : 'text-[#334155] hover:bg-[#1B8A3E] hover:text-white'
                        }`}
                      >
                        {subNested.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Mobile Nav Item — recursively handles top-level, sub-level, and nested sub-sub dropdowns */
interface MobileNavItemProps {
  item: LinkType;
  depth?: number;
  onClose: () => void;
  isActive: (item: LinkType) => boolean;
}

function MobileNavItem({ item, depth = 0, onClose, isActive }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const children = getChildren(item);
  const hasDropdown = children.length > 0;
  const active = isActive(item);

  const paddingLeft = depth === 0 ? 'px-5' : depth === 1 ? 'pl-8 pr-5' : 'pl-12 pr-5';
  const fontSize = depth === 0 ? 'text-[17px] font-extrabold' : depth === 1 ? 'text-[15px] font-bold' : 'text-[14px] font-medium';
  const textColor = depth === 0 ? 'text-white' : depth === 1 ? 'text-white/85' : 'text-white/70';

  return (
    <div className={`flex flex-col ${depth === 0 ? 'border-b border-white/10' : ''}`}>
      <div className={`flex items-center justify-between text-white ${isOpen && depth === 0 ? 'bg-white/5' : ''}`}>
        <Link
          href={item.href}
          onClick={onClose}
          className={`flex-1 py-3.5 transition-colors hover:text-[#1B8A3E] ${paddingLeft} ${fontSize} ${
            active ? 'text-[#1B8A3E]' : textColor
          }`}
        >
          {item.name}
        </Link>
        {hasDropdown && (
          <button
            type="button"
            className="flex h-full items-center px-5 py-3.5 text-white/80 hover:text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            aria-label={`Toggle ${item.name} sub-menu`}
          >
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="block">
              <ChevronDown size={depth === 0 ? 17 : 15} />
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
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden ${depth === 0 ? 'bg-black/20' : 'bg-black/25'}`}
          >
            <div className="py-1">
              {children.map((child, cIdx) => (
                <MobileNavItem
                  key={child.name + child.href + cIdx}
                  item={child}
                  depth={depth + 1}
                  onClose={onClose}
                  isActive={isActive}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isPathActive = (href: string) => {
    if (!href || href === '#') return false;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  const isItemActive = (item: LinkType): boolean => {
    if (isPathActive(item.href)) return true;
    const children = getChildren(item);
    return children.some((child) => isItemActive(child));
  };

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
            src={data.logo_image || "/logo/logo.webp"}
            alt={data.logo_text}
            className="h-[70px] w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-[46px]">
          {data.links?.map((link, idx) => {
            const children = getChildren(link);
            const hasDropdown = children.length > 0;
            const active = isItemActive(link);
            const hovered = hoveredIndex === idx;
            // Open submenu towards left if near the right edge of nav
            const totalLinks = data.links?.length || 5;
            const openToLeft = idx >= totalLinks - 2;

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

                {/* Level 1 Dropdown Menu */}
                <AnimatePresence>
                  {hasDropdown && hovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute ${
                        openToLeft ? 'right-0' : 'left-0'
                      } top-full z-50 min-w-[240px] origin-top border-t-[3px] border-[#1B8A3E] bg-white py-2 shadow-xl before:absolute before:-top-3 before:inset-x-0 before:h-3 before:content-['']`}
                    >
                      {children.map((sub, sIdx) => (
                        <motion.div
                          key={sub.name + sub.href + sIdx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * sIdx, duration: 0.18 }}
                        >
                          <DesktopSubmenuItem
                            item={sub}
                            openToLeft={openToLeft}
                            isActive={isItemActive}
                          />
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

      {/* Mobile Bar */}
      <div className="relative z-20 flex min-h-[64px] items-center justify-between gap-2 bg-white px-4 py-2 lg:hidden">
        <Link href="/" className="min-w-0 shrink">
          <img src={data.logo_image || "/logo/logo.webp"} alt={data.logo_text} className="h-[48px] w-auto object-contain" />
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
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center p-0 cursor-pointer"
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

      {/* Mobile Drawer */}
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
              {data.links?.map((link) => (
                <motion.div key={link.name} variants={mobileItemVariants}>
                  <MobileNavItem
                    item={link}
                    depth={0}
                    onClose={() => setMobileOpen(false)}
                    isActive={isItemActive}
                  />
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
