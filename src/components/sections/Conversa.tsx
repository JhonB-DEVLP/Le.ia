/*
  Mockup de conversa do WhatsApp desenhado em código (nada de imagem).
  É a peça central do hero: o produto da léia vive dentro de uma conversa,
  então a coisa mais característica do assunto é a própria conversa.

  Os balões entram em sequência no carregamento — a única animação não
  disparada pelo usuário na página inteira. `atraso` escalona a entrada;
  `prefers-reduced-motion` desliga tudo (ver globals.css).
*/

export type Mensagem = {
  de: "morador" | "leia";
  texto: string;
  hora: string;
};

function Tique() {
  return (
    <svg
      viewBox="0 0 16 11"
      className="h-3 w-3.5 shrink-0 text-[#53bdeb]"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M11.07.65a.5.5 0 0 1 .04.7L5.6 7.7a.5.5 0 0 1-.72.03L2.1 5.1a.5.5 0 1 1 .68-.73l2.4 2.23L10.37.7a.5.5 0 0 1 .7-.05Z"
      />
      <path
        fill="currentColor"
        d="M15.3.65a.5.5 0 0 1 .04.7L9.83 7.7a.5.5 0 0 1-.72.03l-.8-.74.68-.8.44.4L14.6.7a.5.5 0 0 1 .7-.05Z"
      />
    </svg>
  );
}

export function Balao({
  mensagem,
  atraso,
}: {
  mensagem: Mensagem;
  atraso?: number;
}) {
  const doMorador = mensagem.de === "morador";
  // Sem `atraso` o balão nasce visível: só a conversa do hero é animada, e
  // as demais precisam estar legíveis mesmo fora da viewport.
  const animado = atraso !== undefined;

  return (
    <div
      className={`${animado ? "balao" : ""} flex ${doMorador ? "justify-end" : "justify-start"}`}
      style={animado ? { animationDelay: `${atraso}ms` } : undefined}
    >
      <div
        className={`max-w-[85%] px-3 py-2 text-[13px] leading-snug shadow-sm sm:text-sm ${
          doMorador
            ? "rounded-2xl rounded-br-sm bg-zap-enviada text-zap-texto"
            : "rounded-2xl rounded-bl-sm bg-zap-recebida text-zap-texto"
        }`}
      >
        <p className="whitespace-pre-line">{mensagem.texto}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[color:var(--zap-hora)]">
          {mensagem.hora}
          {doMorador && <Tique />}
        </p>
      </div>
    </div>
  );
}

export function Digitando({ atraso }: { atraso?: number }) {
  const animado = atraso !== undefined;

  return (
    <div
      className={`${animado ? "balao" : ""} flex justify-start`}
      style={animado ? { animationDelay: `${atraso}ms` } : undefined}
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-zap-recebida px-4 py-3 shadow-sm">
        <span className="sr-only">léia está digitando</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="ponto-digitando h-1.5 w-1.5 rounded-full bg-zap-texto/40"
            style={{ animationDelay: `${(atraso ?? 0) + i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Janela de conversa completa, com a barra de topo do WhatsApp.
 * `digitandoAoFim` acrescenta o indicador de digitação depois do último
 * balão — usado no hero, onde a conversa fica "em andamento".
 */
export default function Conversa({
  mensagens,
  digitandoAoFim = false,
  animada = false,
  comCabecalho = true,
  className = "",
}: {
  mensagens: readonly Mensagem[];
  digitandoAoFim?: boolean;
  /** Escalona a entrada dos balões. Reservado ao hero. */
  animada?: boolean;
  /**
   * A barra de contato do WhatsApp. Fica só no hero: repetida em cada
   * conversa de apoio ela vira ruído e rouba o peso do próprio diálogo.
   */
  comCabecalho?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[26px] bg-zap-fundo shadow-[0_24px_60px_-20px_rgba(7,15,43,0.45)] ring-1 ring-tinta/5 ${className}`}
    >
      {comCabecalho && (
      <div className="flex items-center gap-3 bg-zap-cabecalho px-4 py-3">
        {/*
          O avatar é o prédio, não a assistente: no WhatsApp do morador o
          contato salvo é o condomínio, e é assim que a conversa aparece de
          verdade no aparelho dele.
        */}
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/95">
          <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="var(--leia-marca)" />
            {/* Torre principal */}
            <path d="M7 6.5h7.5v13H7z" fill="#fff" />
            {/* Anexo mais baixo à direita */}
            <path d="M14.5 10.5H18v9h-3.5z" fill="#fff" fillOpacity="0.75" />
            {/* Janelas: três fileiras de dois */}
            <g fill="var(--leia-marca)">
              <rect x="8.6" y="8.4" width="1.5" height="1.7" rx="0.3" />
              <rect x="11.4" y="8.4" width="1.5" height="1.7" rx="0.3" />
              <rect x="8.6" y="11.6" width="1.5" height="1.7" rx="0.3" />
              <rect x="11.4" y="11.6" width="1.5" height="1.7" rx="0.3" />
              <rect x="8.6" y="14.8" width="1.5" height="1.7" rx="0.3" />
              <rect x="15.4" y="12.6" width="1.3" height="1.5" rx="0.3" />
              <rect x="15.4" y="15.4" width="1.3" height="1.5" rx="0.3" />
            </g>
            {/* Porta */}
            <rect
              x="10.9"
              y="16.6"
              width="2.2"
              height="2.9"
              rx="0.4"
              fill="var(--leia-marca)"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            Condomínio Ilha do Sol
          </p>
          <p className="truncate text-[11px] text-white/70">online</p>
        </div>
      </div>
      )}

      <div className="flex flex-col gap-2 px-3 py-4 sm:px-4">
        {mensagens.map((mensagem, i) => (
          <Balao
            key={mensagem.texto}
            mensagem={mensagem}
            atraso={animada ? 300 + i * 550 : undefined}
          />
        ))}
        {digitandoAoFim && (
          <Digitando
            atraso={animada ? 300 + mensagens.length * 550 : undefined}
          />
        )}
      </div>
    </div>
  );
}
