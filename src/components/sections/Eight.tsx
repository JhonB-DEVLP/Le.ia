"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "Preciso trocar meu número de WhatsApp para usar a léia?",
    answer:
      "Não. A léia se conecta ao número de WhatsApp que você já utiliza, sem precisar trocar de número ou migrar seus contatos.",
  },
  {
    question: "Quanto tempo leva para configurar a léia no meu condomínio?",
    answer:
      "A configuração inicial leva poucos minutos. Você define tom de voz, regras e documentos, e a léia já começa a atender os moradores.",
  },
  {
    question: "O que acontece quando a IA não consegue resolver o chamado?",
    answer:
      "A léia identifica quando o assunto exige um humano e encaminha automaticamente para a pessoa responsável, sem deixar o morador sem resposta.",
  },
  {
    question: "Consigo atender mais de um condomínio com a mesma conta?",
    answer:
      "Sim. É possível conectar diversos números de WhatsApp e manter bases de dados, atendimento e relatórios separados por condomínio.",
  },
  {
    question: "Existe fidelidade ou multa de cancelamento?",
    answer:
      "Não. Os planos são mensais e você pode cancelar quando quiser, sem multa ou taxa adicional.",
  },
];

export default function Eight() {
  return (
    <section id="faq" className="border-t border-borda bg-papel">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
        <h2 className="display text-3xl text-tinta sm:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue={faqs[0].question}
          className="flex flex-col"
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.question}
              value={faq.question}
              className="border-b border-borda first:border-t"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left">
                  <span className="text-base font-semibold text-tinta sm:text-lg">
                    {faq.question}
                  </span>
                  <HiChevronDown className="h-5 w-5 shrink-0 text-azul transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-[60ch] pb-6 text-base text-tinta/70">
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
