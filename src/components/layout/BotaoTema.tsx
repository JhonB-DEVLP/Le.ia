"use client";

import { useCallback, useSyncExternalStore } from "react";

type Tema = "claro" | "escuro";

/*
  Botão de tema. O ícone não troca de figura: o MESMO círculo vira sol ou
  lua. No escuro, uma máscara desliza sobre ele e recorta a crescente,
  enquanto os raios se retraem para o centro — a animação mostra a mudança
  em vez de apenas anunciá-la.

  O tema real mora no atributo `data-tema` do <html>, escrito pelo script
  inline do layout antes da primeira pintura. Como é estado externo ao
  React, é lido com useSyncExternalStore: no servidor e no primeiro render
  do cliente vale "claro", e a assinatura sincroniza depois sem disparar
  renderizações em cascata.
*/
const assinar = (aoMudar: () => void) => {
  const observador = new MutationObserver(aoMudar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-tema"],
  });
  return () => observador.disconnect();
};

const lerTema = (): Tema =>
  document.documentElement.dataset.tema === "escuro" ? "escuro" : "claro";

/* O servidor não conhece a escolha do visitante; o script inline corrige
   antes da primeira pintura. */
const lerTemaNoServidor = (): Tema => "claro";

export default function BotaoTema() {
  const tema = useSyncExternalStore(assinar, lerTema, lerTemaNoServidor);

  const alternar = useCallback(() => {
    const raiz = document.documentElement;
    const novo: Tema =
      raiz.dataset.tema === "escuro" ? "claro" : "escuro";

    raiz.dataset.tema = novo;
    try {
      localStorage.setItem("tema", novo);
    } catch {
      // Navegação privativa ou storage bloqueado: o tema vale só nesta visita.
    }
  }, []);

  const escuro = tema === "escuro";

  return (
    <button
      type="button"
      onClick={alternar}
      // Antes da hidratação o estado real é desconhecido; o rótulo genérico
      // evita anunciar a ação errada para quem usa leitor de tela.
      aria-label={escuro ? "Usar tema claro" : "Usar tema escuro"}
      aria-pressed={escuro}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-borda text-tinta transition-colors hover:border-borda-forte"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          {/*
            A máscara é o que transforma o sol em lua: o disco branco fica
            visível e o círculo preto que desliza por cima recorta a
            crescente. No claro ele fica fora do quadro.
          */}
          <mask id="mascara-tema">
            <rect width="24" height="24" fill="#000" />
            <circle cx="12" cy="12" r="11" fill="#fff" />
            <circle
              cx={escuro ? 17 : 26}
              cy={escuro ? 7 : 2}
              r="10"
              fill="#000"
              style={{
                transition: "cx 500ms cubic-bezier(0.3, 0, 0.2, 1), cy 500ms cubic-bezier(0.3, 0, 0.2, 1)",
              }}
            />
          </mask>
        </defs>

        <circle
          cx="12"
          cy="12"
          r={escuro ? 10 : 5}
          fill="currentColor"
          mask="url(#mascara-tema)"
          style={{ transition: "r 500ms cubic-bezier(0.3, 0, 0.2, 1)" }}
        />

        {/*
          Os oito raios recolhem para o centro e somem no tema escuro. O
          atraso escalonado faz o movimento parecer um fechamento, não um
          apagar simultâneo.
        */}
        <g
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          style={{
            opacity: escuro ? 0 : 1,
            transform: escuro ? "scale(0.4) rotate(-40deg)" : "none",
            transformOrigin: "center",
            transition: "opacity 300ms ease, transform 500ms cubic-bezier(0.3, 0, 0.2, 1)",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angulo = (i * Math.PI) / 4;
            const x = 12 + Math.cos(angulo);
            const y = 12 + Math.sin(angulo);
            return (
              <line
                key={i}
                x1={x + Math.cos(angulo) * 7}
                y1={y + Math.sin(angulo) * 7}
                x2={x + Math.cos(angulo) * 9.5}
                y2={y + Math.sin(angulo) * 9.5}
              />
            );
          })}
        </g>
      </svg>
    </button>
  );
}
