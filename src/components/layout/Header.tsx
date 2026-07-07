import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" width={120} height={37} priority />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {/* TODO: ajustar os ids das seções alvo quando definidas */}
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#precos">Preços</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/contratar"
            className="rounded-[5px] border border-[#4D6EFF] px-5 py-2 font-medium text-[#4D6EFF] transition-colors hover:bg-[#4D6EFF]/10"
          >
            Contratar
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
