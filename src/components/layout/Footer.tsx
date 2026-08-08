import Image from "next/image";
import Link from "next/link";
import {
  appUrl,
  contatoEmail,
  empresa,
  whatsappLink,
  whatsappMessages,
} from "@/lib/site";

/**
 * Apenas links que levam a destinos reais.
 * NÃO adicionar item com href="#": a verificação de Tech Provider da Meta
 * trata link morto como sinal de site incompleto/template não editado.
 */
const links = [
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planos", href: "/#planos" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sobre nós", href: "/sobre" },
  { label: "Fale conosco", href: "/#fale-conosco" },
];

const legal = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white"
      style={{
        background: "linear-gradient(to bottom, #4D6EFF, #3C4E9F)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-3 sm:gap-12 sm:px-6 sm:py-16">
        <div>
          <Image src="/LogoFooter.svg" alt="léia" width={120} height={33} />

          {/* Identificação da operadora: exigida pela verificação da Meta,
              que compara a razão social do formulário com a exibida no site. */}
          <p className="mt-4 text-sm font-medium text-white">
            {empresa.razaoSocial}
          </p>
          <p className="mt-1 text-sm text-white/90">CNPJ {empresa.cnpj}</p>

          <address className="mt-4 text-sm not-italic text-white/90">
            {empresa.endereco.logradouro}
            <br />
            {empresa.endereco.bairro}, {empresa.endereco.cidade} —{" "}
            {empresa.endereco.estado}
            <br />
            {empresa.endereco.pais}
          </address>

          <a
            href={`mailto:${contatoEmail}`}
            className="mt-4 inline-block text-sm text-white/90 underline-offset-2 hover:underline"
          >
            {contatoEmail}
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white/70">
            LINKS
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={whatsappLink(whatsappMessages.contato)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                Acessar painel
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white/70">
            LEGAL
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {legal.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-xs text-white/80">
            © {anoAtual} {empresa.razaoSocial}. Todos os direitos reservados.
            léia é uma plataforma de {empresa.razaoSocial}.
          </p>
        </div>
      </div>
    </footer>
  );
}
