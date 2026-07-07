const links = [
  { label: "Sobre nós", href: "#" },
  { label: "Tutoriais", href: "#" },
  { label: "Documentação API", href: "#" },
  { label: "Ajuda", href: "#" },
  { label: "Fale Conosco", href: "#" },
  { label: "Status", href: "#" },
  { label: "Parceria", href: "#" },
];

const legal = [
  { label: "Politica de Privacidade", href: "#" },
  { label: "Termos de Serviço", href: "#" },
  { label: "Acordo Comercial", href: "#" },
  { label: "DPA", href: "#" },
  { label: "Denunciar Abuso", href: "#" },
];

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full text-white"
      style={{
        background: "linear-gradient(to bottom, #4D6EFF, #3C4E9F)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-3">
        <div>
          <Image src="/LogoFooter.png" alt="Logo" width={120} height={33} />
          <p className="mt-4 text-sm text-white/90">
            Rua do Apolo, 118, sala 03
            <br />
            Recife Antigo, Recife, Pernambuco.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white/70">
            LINKS
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white/80">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white/70">
            LEGAL
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white/80">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
