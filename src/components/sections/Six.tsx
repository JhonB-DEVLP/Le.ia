"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const testimonials = [
  {
    quote:
      "Tenho clientes com mais de 400 unidades, tinha dia de ter que responder mais de 200 mensagens no WhatsApp, todo mundo querendo urgência. Hoje a maior parte deles a léia resolve sozinha, uma tranquilidade.",
    name: "Reginaldo Júnior",
    role: "Seu Síndico",
  },
  {
    quote:
      "O morador não quer esperar, sempre que ele entra em contato tem urgência. Atendemos 320 edifícios, são mais de 10 mil unidades, o trabalho braçal antes de usarmos a léia era descomunal.",
    name: "André Vasconcelos",
    role: "Sindicorp",
  },
  {
    quote:
      "O morador ficou mais feliz do que nós ficamos depois de implementarmos a IA. Sim, ela nos economiza muito trabalho, mas para o morador significa resolver as coisas muito mais rápido.",
    name: "Tatiana Ribeiro",
    role: "Roda Viva Administradora",
  },
  {
    quote:
      "Mês passado a léia atendeu mais de 8 mil chamados dos condomínios que administramos, foram 8 mil conversas que não precisamos ter e que ainda assim o morador ficou super satisfeito.",
    name: "Bruno Sampaio",
    role: "SíndicoPRO",
  },
  {
    quote:
      "Reduzimos o tempo de resposta de horas para segundos. O morador manda mensagem às 2 da manhã reclamando de barulho e já recebe orientação na hora, sem precisar acordar ninguém da equipe.",
    name: "Marina Alcântara",
    role: "Gestão Alcântara",
  },
  {
    quote:
      "A maior surpresa foi a queda nas ligações fora de hora. A léia filtra o que é realmente urgente e só nos aciona quando precisa de fato de uma pessoa, o resto ela resolve sozinha.",
    name: "Carlos Eduardo Matos",
    role: "Matos Condomínios",
  },
  {
    quote:
      "Hoje conseguimos crescer a carteira sem contratar mais gente para o atendimento. A léia absorveu o volume que antes exigiria pelo menos mais três pessoas na operação.",
    name: "Fernanda Brioli",
    role: "Brioli Administradora",
  },
  {
    quote:
      "O que mais impressiona é a organização: cada condomínio com seu histórico separado, relatório certo na hora certa. Antes isso era feito manualmente e sempre dava confusão.",
    name: "Paulo Henrique Sales",
    role: "PHS Síndicos",
  },
];

export default function Six() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ speed: 0.6, stopOnInteraction: false }),
  ]);

  return (
    <section id="depoimentos" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="display max-w-[20ch] text-3xl text-tinta sm:text-4xl">
          Quem administra condomínio de verdade já delegou
        </h2>
      </div>

      {/*
        Carrossel de largura total: a tira que atravessa a tela reforça que
        são muitos clientes, e o corte nas bordas convida a arrastar.
      */}
      <div
        className="relative left-1/2 right-1/2 mx-[-50vw] mt-12 w-screen overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name + testimonial.role}
              className="w-[82%] shrink-0 pl-4 sm:w-[46%] sm:pl-6 lg:w-[27%]"
            >
              <div className="flex h-full flex-col justify-between rounded-2xl border border-borda bg-fundo p-6 sm:p-7">
                <blockquote className="text-base leading-relaxed text-tinta/85">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-borda pt-4">
                  <span className="block font-semibold text-tinta">
                    {testimonial.name}
                  </span>
                  <span className="block text-sm text-tinta/55">
                    {testimonial.role}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
