"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FooterProps } from '../../types';
import { MapPin, Phone, Mail, Clock, Zap, ChevronRight, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const socialIconMap: Record<string, React.ElementType> = {
  Facebook: FaFacebookF,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Linkedin: FaLinkedinIn,
  Youtube: FaYoutube,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function LinkColumn({
  title,
  links,
  open,
  onToggle,
}: {
  title: string;
  links: { name: string; href: string }[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={fadeUp} className="w-full max-w-full border-b border-white/10 lg:w-max lg:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-left lg:pointer-events-none lg:cursor-default lg:py-0"
        aria-expanded={open}
      >
        <span>
          <h3 className="text-[16px] font-bold text-white">{title}</h3>
          <span className="mt-1 hidden h-[3px] w-9 rounded-full bg-[#1B8A3E] lg:block" />
        </span>
        <ChevronDown
          size={18}
          className={`text-[#1B8A3E] transition-transform duration-300 lg:hidden ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div className="hidden lg:block">
        <ul className="mt-4 space-y-[11px]">
          {links.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                className="group flex items-center gap-1.5 text-[13.5px] text-white/85 transition-colors hover:text-[#1B8A3E]"
              >
                <ChevronRight
                  size={14}
                  className="shrink-0 text-[#1B8A3E] transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.6}
                />
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="space-y-2.5 overflow-hidden pb-3.5 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-1.5 text-[13.5px] text-white/85 transition-colors hover:text-[#1B8A3E]"
                >
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-[#1B8A3E]"
                    strokeWidth={2.6}
                  />
                  {l.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Footer({ data }: FooterProps) {
  const support = data.support || [];
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const bottomLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  const contacts = [
    { icon: Phone, label: 'Call Us', value: data.contact.phone },
    { icon: Mail, label: 'Email Us', value: data.contact.email },
    { icon: MapPin, label: 'Our Location', value: data.contact.address },
    { icon: Clock, label: 'Working Hours', value: data.contact.hours },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#05203a] text-white">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.08, 0.16, 0.08], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-6 top-6 hidden text-[#1a4a6e] lg:block"
      >
        <Zap size={220} strokeWidth={1.1} />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-9 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
      >
        <motion.div variants={fadeUp} className="lg:max-w-[280px] lg:shrink-0">
          <Link href="/" className="mb-1.5 inline-block">
            <img
              src="/logo/white-logo.png"
              alt={data.logo_text || 'ElectroCare'}
              className="h-[70px] w-auto object-contain"
            />
          </Link>
          <p className="mb-2 max-w-[270px] text-[13.5px] leading-[1.6] text-white/80">{data.description}</p>
          <p className="relative mb-3.5 inline-block font-serif text-[15px] italic text-white/95">
            Safe Power. Brighter Tomorrow.
            <span className="absolute -bottom-0.5 left-10 h-[2px] w-[62px] rounded-full bg-[#1B8A3E]/90" />
          </p>
          <div className="flex gap-2.5">
            {data.socials.map((s, i) => {
              const Icon = socialIconMap[s.icon] || FaFacebookF;
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.icon}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:border-[#1B8A3E] hover:bg-[#1B8A3E]"
                >
                  <Icon size={13} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <div className="w-full max-w-full lg:flex lg:w-max lg:flex-wrap lg:gap-x-10">
          <LinkColumn
            title="Quick Links"
            links={data.quick_links}
            open={openAcc === 'Quick Links'}
            onToggle={() => setOpenAcc((v) => (v === 'Quick Links' ? null : 'Quick Links'))}
          />
          <LinkColumn
            title="Our Services"
            links={data.our_services}
            open={openAcc === 'Our Services'}
            onToggle={() => setOpenAcc((v) => (v === 'Our Services' ? null : 'Our Services'))}
          />
          <LinkColumn
            title="Support"
            links={support}
            open={openAcc === 'Support'}
            onToggle={() => setOpenAcc((v) => (v === 'Support' ? null : 'Support'))}
          />
        </div>

        <motion.div
          variants={fadeUp}
          className="w-max space-y-[22px] border-white/20 lg:shrink-0 lg:border-l lg:pl-8"
        >
          {contacts.map((item) => (
            <motion.div
              key={item.label}
              className="flex items-start gap-3.5"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#1B8A3E] text-white">
                <item.icon size={20} strokeWidth={2} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[13px] leading-tight text-white/75">{item.label}</p>
                <p className="mt-0.5 text-[15px] font-semibold leading-snug text-white">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative bg-[#1B8A3E] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-5 py-3.5 text-[13px] font-medium sm:flex-row sm:px-8">
          <p>{data.copyright}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2">
            {bottomLinks.map((l, i) => (
              <React.Fragment key={l.name}>
                {i > 0 && <span className="opacity-70">|</span>}
                <Link href={l.href} className="transition-opacity hover:opacity-80">
                  {l.name}
                </Link>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
