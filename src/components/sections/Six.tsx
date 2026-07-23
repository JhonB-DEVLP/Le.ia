"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { FaQuoteLeft } from "react-icons/fa";

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
    <section id="depoimentos" className="py-10 sm:py-16">
      <h2 className="px-4 text-center text-2xl font-semibold sm:px-6 sm:text-3xl">
        Quem usa indica a léia
      </h2>

      <div
        className="relative mt-10 left-1/2 right-1/2 mx-[-50vw] w-screen overflow-hidden sm:mt-12"
        ref={emblaRef}
      >
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name + testimonial.role}
              className="w-[80%] shrink-0 pl-4 sm:w-[45%] sm:pl-6 md:w-[30%] lg:w-[18%]"
            >
              <div className="flex h-full flex-col items-center rounded-2xl bg-[#E4E8FB] p-6 text-center sm:p-8">
                <div className="flex flex-col items-center">
                  <FaQuoteLeft className="h-7 w-7 text-[#4D6EFF] sm:h-8 sm:w-8" />
                  <p className="mt-6 text-sm text-black/80 sm:text-base">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="mt-auto flex flex-col items-center pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4D6EFF] text-lg font-semibold text-white sm:h-16 sm:w-16 sm:text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="mt-4 font-semibold text-black">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-black/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
