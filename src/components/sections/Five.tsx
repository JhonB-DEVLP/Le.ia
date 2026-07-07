import {
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineMegaphone,
  HiOutlineTruck,
  HiOutlineUserCircle,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const cards: { icon: IconType; label: string }[] = [
  { icon: HiOutlineCalendarDays, label: "Dúvidas sobre\nhorários" },
  { icon: HiOutlinePencilSquare, label: "Consulta sobre\nconvenção e edital" },
  { icon: HiOutlineCheckCircle, label: "Consulta sobre\nreservas" },
  {
    icon: HiOutlineDocumentText,
    label: "Envio de documentos\ne links importantes",
  },
  {
    icon: HiOutlineQuestionMarkCircle,
    label: "Dúvidas sobre regras\ne regulamentos",
  },
  { icon: HiOutlineMegaphone, label: "Novidades e\ninformações" },
  { icon: HiOutlineTruck, label: "Indicação de\nfornecedores" },
  { icon: HiOutlineUserCircle, label: "Colaboradores e\nhorários" },
  {
    icon: HiOutlineCreditCard,
    label: "Solicitação de boletos\ne consultas",
  },
];

export default function Five() {
  return (
    <section id="funcionalidades" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        A assistente inteligente do administrador inteligente.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-8 text-center text-white sm:py-10"
            style={{
              background: "linear-gradient(to bottom, #4D6EFF, #3C4E9F)",
            }}
          >
            <card.icon className="h-9 w-9 sm:h-10 sm:w-10" />
            <p className="whitespace-pre-line text-base font-medium sm:text-lg">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
