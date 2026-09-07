import Conversa, { type Mensagem } from "@/components/sections/Conversa";
import { appRoutes } from "@/lib/site";

/*
  A conversa do hero é uma pergunta real de morador, do tipo que hoje chega
  no WhatsApp do síndico às onze da noite. Mostrar a léia respondendo isso
  explica o produto mais rápido que qualquer texto sobre ele.
*/
const conversa: readonly Mensagem[] = [
  {
    de: "morador",
    texto: "Boa noite! Consigo reservar o salão de festas dia 14?",
    hora: "22:47",
  },
  {
    de: "leia",
    texto:
      "Boa noite, Camila! O dia 14 está livre. A taxa é de R$ 120 e a reserva vale até 22h.\n\nQuer que eu já registre no seu nome?",
    hora: "22:47",
  },
  { de: "morador", texto: "Quero sim, por favor", hora: "22:48" },
] as const;

export default function Hero({
  contatoHref,
}: {
  contatoHref: string;
}) {
  return (
    <section className="border-b border-borda bg-papel">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <h1 className="display text-[2.15rem] text-tinta sm:text-5xl lg:text-[3.6rem]">
            O síndico dorme. A léia responde.
          </h1>

          <p className="mt-6 max-w-[38ch] text-lg text-tinta/75 sm:text-xl">
            Ela atende os moradores no WhatsApp a qualquer hora e resolve
            sozinha até 95% das dúvidas — horários, regras, boletos e
            reservas. Você só entra quando é realmente necessário.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={contatoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-azul px-7 py-3.5 text-center font-semibold text-sobre-azul transition-colors hover:bg-royal"
            >
              Agendar uma conversa
            </a>
            <a
              href={appRoutes.cadastro}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-borda-forte px-7 py-3.5 text-center font-semibold text-tinta transition-colors hover:border-tinta/50 hover:bg-fundo"
            >
              Criar minha conta
            </a>
          </div>

          <p className="mt-8 text-sm text-tinta/60">
            Sem fidelidade. Sem trocar o número que o condomínio já usa.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[26rem] lg:max-w-none">
          <Conversa mensagens={conversa} digitandoAoFim animada />
        </div>
      </div>
    </section>
  );
}
