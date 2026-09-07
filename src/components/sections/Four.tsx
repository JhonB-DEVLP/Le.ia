"use client";

import { useState } from "react";

/*
  Dois públicos com necessidades diferentes. Antes era um cartão azul com
  ilustração recortada por cima; agora é um painel escuro — o único bloco
  escuro da página, o que dá a ele o peso de "aqui está a decisão de compra"
  sem precisar de gradiente.

  As duas abas são conteúdo alternativo, não uma sequência, então nada de
  numeração.
*/
const publicos = [
  {
    chave: "administradoras",
    aba: "Administradoras",
    titulo: "Uma equipe atendendo trinta condomínios sem trinta números",
    itens: [
      "Um único WhatsApp atende toda a carteira.",
      "Cada condomínio com sua própria base de documentos.",
      "Atendimento humano roteado por condomínio.",
      "Relatórios de chamados separados por cliente.",
      "Integração com os principais sistemas de gestão.",
    ],
  },
  {
    chave: "sindicos",
    aba: "Síndicos",
    titulo: "O plantão de madrugada que você não precisa mais fazer",
    itens: [
      "Atendimento 24 horas, todos os dias, no WhatsApp.",
      "Regulamento, atas e comunicados sempre à mão do morador.",
      "Reconhece o que é urgente e aciona você na hora.",
      "Recebe e organiza as reservas de áreas comuns.",
      "Atualização feita por você, sem depender de suporte.",
    ],
  },
] as const;

export default function Four() {
  const [ativo, setAtivo] = useState<(typeof publicos)[number]["chave"]>(
    publicos[0].chave,
  );

  const atual = publicos.find((p) => p.chave === ativo)!;

  return (
    <section className="sobre-escuro bg-destaque">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="display max-w-[16ch] text-3xl text-destaque-texto sm:text-4xl">
            Quem já parou de responder no lugar da léia
          </h2>

          <div
            role="tablist"
            aria-label="Escolha o seu perfil"
            className="flex gap-1 rounded-full bg-white/10 p-1"
          >
            {publicos.map((publico) => (
              <button
                key={publico.chave}
                role="tab"
                type="button"
                aria-selected={ativo === publico.chave}
                onClick={() => setAtivo(publico.chave)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  ativo === publico.chave
                    ? "bg-white text-[#0b1a4a]"
                    : "text-destaque-texto/75 hover:text-destaque-texto"
                }`}
              >
                {publico.aba}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <h3 className="display text-2xl text-destaque-texto sm:text-3xl">
            {atual.titulo}
          </h3>

          {/*
            Lista com régua à esquerda: a linha vertical agrupa os itens como
            um conjunto único, em vez de cinco caixas repetidas.
          */}
          <ul className="flex flex-col gap-px border-l border-white/25 pl-6">
            {atual.itens.map((item) => (
              <li
                key={item}
                className="py-3 text-base text-destaque-texto/80 sm:text-lg"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
