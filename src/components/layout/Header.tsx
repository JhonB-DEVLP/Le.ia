"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Fale Conosco", href: "#fale-conosco" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      setVisible(!scrollingDown || currentScrollY < 80);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/10 bg-white transition-transform duration-300 dark:border-white/10 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
        <a href="#top" onClick={() => setMenuOpen(false)}>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={144}
            height={44}
            priority
            className="h-8 w-auto sm:h-auto"
          />
        </a>

        <nav className="hidden items-center gap-6 text-ls lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-sm lg:flex">
          <Link
            href="https://wa.me/5500000000000?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20para%20conhecer%20melhor%20a%20L%C3%A9.ia."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[5px] border border-[#4D6EFF] px-5 py-2 font-medium text-[#4D6EFF] transition-colors hover:bg-[#4D6EFF]/10"
          >
            Contato
          </Link>
          <Link
            href="/login"
            className="rounded-[5px] bg-[#4D6EFF] px-5 py-2 font-medium text-white transition-colors hover:bg-[#3d5ce6]"
          >
            Acessar
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-black lg:hidden"
        >
          {menuOpen ? (
            <HiOutlineX className="h-7 w-7" />
          ) : (
            <HiOutlineMenu className="h-7 w-7" />
          )}
        </button>
      </div>

      <div
        className={`grid overflow-hidden border-t border-black/10 transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-4 text-base">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-3 font-medium active:bg-black/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-4 pb-6 text-sm">
            <Link
              href="https://wa.me/5500000000000?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20para%20conhecer%20melhor%20a%20L%C3%A9.ia."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-[5px] border border-[#4D6EFF] px-5 py-3 text-center font-medium text-[#4D6EFF] transition-colors hover:bg-[#4D6EFF]/10"
            >
              Contato
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-[5px] bg-[#4D6EFF] px-5 py-3 text-center font-medium text-white transition-colors hover:bg-[#3d5ce6]"
            >
              Acessar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
