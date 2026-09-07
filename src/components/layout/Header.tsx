"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import BotaoTema from "@/components/layout/BotaoTema";
import { appRoutes, whatsappLink, whatsappMessages } from "@/lib/site";

const defaultContatoHref = whatsappLink(whatsappMessages.contato);

const navLinks = [
  { label: "Testar", href: "#testar" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Fale Conosco", href: "#fale-conosco" },
];

export default function Header({
  contatoHref = defaultContatoHref,
}: {
  contatoHref?: string;
}) {
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
      className={`sticky top-0 z-50 w-full border-b border-borda bg-fundo/90 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
        <a href="#top" onClick={() => setMenuOpen(false)}>
          <Image
            src="/Logo.png"
            alt="léia"
            width={144}
            height={44}
            priority
            className="h-8 w-auto lg:h-10"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-tinta/70 transition-colors hover:text-tinta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-sm lg:flex">
          <Link
            href={contatoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-borda-forte px-5 py-2 font-semibold text-tinta transition-colors hover:border-tinta/50"
          >
            Contato
          </Link>
          <a
            href={appRoutes.login}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-azul px-5 py-2 font-semibold text-sobre-azul transition-colors hover:bg-royal"
          >
            Acessar
          </a>
          <BotaoTema />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <BotaoTema />
          <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-tinta lg:hidden"
        >
          {menuOpen ? (
            <HiOutlineX className="h-7 w-7" />
          ) : (
            <HiOutlineMenu className="h-7 w-7" />
          )}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden border-t border-borda transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
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
                className="rounded-md px-2 py-3 font-medium text-tinta active:bg-tinta/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-4 pb-6 text-sm">
            <Link
              href={contatoHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-borda-forte px-5 py-3 text-center font-semibold text-tinta"
            >
              Contato
            </Link>
            <a
              href={appRoutes.login}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-azul px-5 py-3 text-center font-semibold text-sobre-azul"
            >
              Acessar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
