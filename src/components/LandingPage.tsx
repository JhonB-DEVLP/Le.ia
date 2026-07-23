import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Two from "@/components/sections/Two";
import Three from "@/components/sections/Three";
import Four from "@/components/sections/Four";
import Five from "@/components/sections/Five";
import Six from "@/components/sections/Six";
import Seven from "@/components/sections/Seven";
import Eight from "@/components/sections/Eight";
import Nine from "@/components/sections/Nine";
import { whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Conteúdo compartilhado da landing (home e /promo).
 * A única diferença entre as páginas são os links de WhatsApp:
 * - Na home, usam as mensagens padrão (default das props).
 * - Na /promo, recebem a mensagem de desconto da campanha.
 */
export default function LandingPage({
  contatoHref = whatsappLink(whatsappMessages.contato),
  especialistaHref = whatsappLink(whatsappMessages.especialista),
}: {
  contatoHref?: string;
  especialistaHref?: string;
}) {
  return (
    <>
      <Header contatoHref={contatoHref} />
      <main id="top">
        <Hero />
        <Two />
        <Three />
        <Four />
        <Five />
        <Six />
        <Seven whatsappHref={especialistaHref} />
        <Eight />
        <Nine />
      </main>
      <Footer />
    </>
  );
}
