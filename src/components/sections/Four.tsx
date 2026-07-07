"use client";

import { useState } from "react";
import Image from "next/image";

const audiences = [
  {
    key: "administradoras",
    label: "Administradoras e\nsíndicos profissionais",
    image: "/Four/image 36.svg",
    imageSide: "left",
    title: "A lé.ia economizando tempo, dinheiro e estresse.",
    bullets: [
      "Um único número de WhatsApp para atender diversos condomínios.",
      "Bases de dados separadas para cada condomínio atendido.",
      "Atendimento humano separado por condomínio.",
      "Relatórios de chamados customizados por condomínio.",
      "Integrações com os principais sistemas de gestão do mercado.",
    ],
  },
  {
    key: "sindicos",
    label: "Síndicos e\nsub-síndicos",
    image: "/Four/image 37.svg",
    imageSide: "right",
    title: "A lé.ia resolvendo até 90% dos chamados diários.",
    bullets: [
      "Disponível 24/7 por WhatsApp para atender os moradores.",
      "Regras, regulamento, informações e documentos sempre disponíveis.",
      "Reconhece situações que precisam da ação de um humano.",
      "Gerencia reservas de áreas comuns do condomínio.",
      "Fácil de atualizar e gerencias, com diversos relatórios diferentes.",
    ],
  },
] as const;

export default function Four() {
  const [selected, setSelected] = useState<(typeof audiences)[number]["key"]>(
    audiences[0].key,
  );

  const current = audiences.find((a) => a.key === selected)!;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
      <div className="relative">
        <div
          className="rounded-3xl"
          style={{
            background: "linear-gradient(to bottom, #4D6EFF, #3C4E9F)",
          }}
        >
          <div className="px-4 pt-8 sm:px-10 sm:pt-14 md:px-14 md:pt-20">
            <div className="flex justify-center">
              <div className="inline-flex flex-col gap-1 rounded-3xl border border-white/70 p-1 sm:flex-row sm:rounded-full">
                {audiences.map((audience) => (
                  <button
                    key={audience.key}
                    type="button"
                    onClick={() => setSelected(audience.key)}
                    className={`cursor-pointer whitespace-pre-line rounded-full px-4 py-2.5 text-center text-xs font-medium transition-colors sm:px-6 sm:py-3 sm:text-sm ${
                      selected === audience.key
                        ? "bg-white text-[#2440C4]"
                        : "text-white"
                    }`}
                  >
                    {audience.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:min-h-144 md:flex-row md:items-center">
            <div
              className={`hidden md:block md:w-2/5 ${
                current.imageSide === "right" ? "order-2" : "order-1"
              }`}
              aria-hidden="true"
            />

            <div
              className={`w-full px-6 pt-6 pb-6 text-white sm:px-10 md:w-3/5 md:pb-0 md:py-14 ${
                current.imageSide === "right"
                  ? "order-1 md:pl-24 md:pr-0"
                  : "order-2 md:pr-6 md:pl-0"
              }`}
            >
              <h3 className="text-xl font-bold whitespace-pre-line sm:text-2xl md:text-3xl">
                {current.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {current.bullets.map((bullet) => (
                  <li key={bullet} className="text-base text-white/90 sm:text-lg">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:hidden">
            <Image
              src={current.image}
              alt={current.title}
              width={403}
              height={368}
              className="mx-auto h-auto w-full max-w-xs object-bottom"
            />
          </div>
        </div>

        <div
          className={`pointer-events-none absolute bottom-0 z-10 hidden w-full max-w-md md:block md:w-1/2 ${
            current.imageSide === "right"
              ? "right-0 md:-right-10 lg:-right-16"
              : "left-0 md:-left-10 lg:-left-16"
          }`}
          style={{ top: "-4rem" }}
        >
          <Image
            src={current.image}
            alt={current.title}
            width={403}
            height={368}
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
