"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { HiChevronDown } from "react-icons/hi2";

const faqs = [
  {
    question: "Preciso trocar meu número de WhatsApp para usar a lé.ia?",
    answer:
      "Não. A lé.ia se conecta ao número de WhatsApp que você já utiliza, sem precisar trocar de número ou migrar seus contatos.",
  },
  {
    question: "Quanto tempo leva para configurar a lé.ia no meu condomínio?",
    answer:
      "A configuração inicial leva poucos minutos. Você define tom de voz, regras e documentos, e a lé.ia já começa a atender os moradores.",
  },
  {
    question: "O que acontece quando a IA não consegue resolver o chamado?",
    answer:
      "A lé.ia identifica quando o assunto exige um humano e encaminha automaticamente para a pessoa responsável, sem deixar o morador sem resposta.",
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
    <section id="faq" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        Perguntas frequentes
      </h2>

      <Accordion.Root
        type="single"
        collapsible
        defaultValue={faqs[0].question}
        className="mt-10 flex flex-col gap-4 sm:mt-12"
      >
        {faqs.map((faq) => (
          <Accordion.Item
            key={faq.question}
            value={faq.question}
            className="rounded-2xl border border-black/10"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5">
                <span className="font-semibold text-black">
                  {faq.question}
                </span>
                <HiChevronDown className="h-5 w-5 shrink-0 text-[#4D6EFF] transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden px-4 text-base text-black/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down sm:px-6">
              <p className="pb-5">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
