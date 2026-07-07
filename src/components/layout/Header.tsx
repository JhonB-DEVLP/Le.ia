"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [visible, setVisible] = useState(true);
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

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/10 bg-white transition-transform duration-300 dark:border-white/10 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top">
          <Image src="/Logo.png" alt="Logo" width={144} height={44} priority />
        </a>

        <nav className="flex items-center gap-6 text-ls">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#planos">Planos</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
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
      </div>
    </header>
  );
}
