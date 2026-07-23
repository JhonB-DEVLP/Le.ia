import Image from "next/image";
import { whatsappLink, whatsappMessages } from "@/lib/site";

const plans = [
  {
    name: "Simples",
    description:
      "Até 3 números de WhatsApp conectados com seus agentes de atendimento.",
    price: 250,
    highlighted: true,
    features: [
      "1000 chamados por número contratado",
      "Envio de documentos de até 5MB",
      "Recebimento de mensagens por voz",
      "Tutoriais de configuração",
    ],
  },
  {
    name: "Plus",
    description:
      "De 4 a 10 números de WhatsApp conectados com seus agentes de atendimento.",
    price: 200,
    highlighted: false,
    features: [
      "1000 chamados por número contratado",
      "Envio de documentos de até 5MB",
      "Recebimento de mensagens por voz",
      "Tutoriais de configuração",
    ],
  },
  {
    name: "Profissional",
    description:
      "Mais de 11 números de WhatsApp conectados com seus agentes de atendimento.",
    price: 150,
    highlighted: false,
    features: [
      "1000 chamados por número contratado",
      "Envio de documentos de até 5MB",
      "Recebimento de mensagens por voz",
      "Treinamento de configuração",
      "Templates de Prompt",
      "Suporte direto ao admin",
    ],
  },
];

const extras = [
  {
    name: "Chamados\nExtras",
    description: "1000 chamados extras",
    price: 100,
    priceNote: "Pagamento único",
  },
  {
    name: "Módulo\nFinanceiro",
    description: "Consulta de taxas e solicitação de segundas via de boletos/PIX",
    price: 100,
    priceNote: "Por agente/condomínio",
  },
  {
    name: "Módulo de\nReservas",
    description: "Recebimento de reservas via WhatsApp",
    price: 100,
    priceNote: "Por agente/condomínio",
  },
];

export default function Seven({
  whatsappHref = whatsappLink(whatsappMessages.especialista),
}: {
  whatsappHref?: string;
}) {
  return (
    <section id="planos" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        Economia de até 4 mil reais mês
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-black/70">
        A economia gerada pelo uso do léia é prorcional ao volume de
        contatos diários no WhatsApp que, em alguns casos, podem ultrapassar
        100 contatos dia, contabilizando até 4h diárias de trabalho apenas
        para respondê-los.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl bg-white p-6 shadow-md sm:p-8 ${
              plan.highlighted
                ? "border-2 border-[#4D6EFF]"
                : "border border-black/5"
            }`}
          >
            <h3 className="text-center text-xl font-bold tracking-widest text-[#4D6EFF] uppercase">
              {plan.name}
            </h3>

            <hr className="mt-6 border-black/10" />

            <p className="mt-6 text-center font-semibold text-black">
              {plan.description}
            </p>

            <div className="mt-6 text-center">
              <span className="align-top text-lg font-semibold text-black">
                R$
              </span>
              <span className="text-5xl font-bold text-black">
                {plan.price}
              </span>
              <p className="mt-1 text-sm text-black/50">
                Por número de
                <br />
                WhatsApp conectado
              </p>
            </div>

            <hr className="mt-6 border-black/10" />

            <ul className="mt-6 flex-1 space-y-4">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="text-center text-sm text-black/70"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mx-auto mt-8 cursor-pointer rounded-[5px] bg-[#4D6EFF] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3d5ce6]"
            >
              Contratar
            </button>
          </div>
        ))}
      </div>

      <h3 className="mt-14 text-center text-xl font-semibold sm:mt-20 sm:text-2xl">
        Outros serviços e produtos
      </h3>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
        {extras.map((extra) => (
          <div
            key={extra.name}
            className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-md sm:p-8"
          >
            <h4 className="whitespace-pre-line text-center text-lg font-bold tracking-widest text-[#4D6EFF] uppercase sm:text-xl">
              {extra.name}
            </h4>

            <p className="mt-6 text-center font-semibold text-black">
              {extra.description}
            </p>

            <div className="mt-6 text-center">
              <span className="align-top text-lg font-semibold text-black">
                R$
              </span>
              <span className="text-5xl font-bold text-black">
                {extra.price}
              </span>
              <p className="mt-1 text-sm text-black/50">{extra.priceNote}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col overflow-hidden rounded-3xl shadow-md sm:mt-20 md:flex-row">
        <div className="relative h-72 w-full md:h-auto md:w-2/5">
          <Image
            src="/Seven/Imagem.jpg"
            alt="Equipe reunida discutindo a gestão do condomínio"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="w-full bg-[#0A2472] px-6 py-8 sm:px-8 sm:py-10 md:w-3/5 md:px-14 md:py-14">
          <svg
            width="140"
            height="16"
            viewBox="0 0 140 16"
            fill="none"
            className="text-white/60"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1={i * 11 + 4}
                y1="16"
                x2={i * 11 + 12}
                y2="0"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Transforme a gestão do seu condomínio hoje mesmo
          </h3>
          <p className="mt-4 text-base text-white/80">
            Dê o primeiro passo para uma administração transparente, eficiente
            e sem dor de cabeça
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block rounded-[5px] bg-linear-to-r from-[#FFC94D] to-[#FF8A2B] px-8 py-4 text-center font-bold tracking-wide text-[#1a1a1a] uppercase transition-opacity hover:opacity-90 sm:inline-block"
          >
            Falar com um especialista agora
          </a>
        </div>
      </div>
    </section>
  );
}
