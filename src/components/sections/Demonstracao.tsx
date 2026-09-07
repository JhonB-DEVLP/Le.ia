import { gerarQrCode } from "@/lib/qrcode";

/*
  Convite para testar a léia ao vivo, logo depois do hero: quem acabou de ver
  a conversa acontecendo é justamente quem quer experimentar.

  O painel reproduz a peça original — bloco azul, celular na mão e a chamada
  em caixa-alta — mas o celular e o QR são desenhados em código. A arte
  anterior era um bitmap de 592 KB com o QR "queimado" dentro: trocar o link
  exigia refazer a imagem e o código borrava ao ampliar. Aqui o QR é gerado
  em tempo de build a partir de `linkDemonstracao`.
*/
const linkDemonstracao = "https://wa.me/message/UVUN6GWKNGWWD1";

/** Margem obrigatória ao redor do código, em módulos. */
const MARGEM = 2;

function QrCode({ texto }: { texto: string }) {
  const modulos = gerarQrCode(texto);
  const lado = modulos.length + MARGEM * 2;

  return (
    <svg
      viewBox={`0 0 ${lado} ${lado}`}
      className="h-full w-full"
      role="img"
      aria-label="QR code para conversar com a léia no WhatsApp"
      shapeRendering="crispEdges"
    >
      {/*
        O fundo claro é obrigatório mesmo no tema escuro: leitores esperam
        módulos escuros sobre fundo claro, e invertê-los quebra a leitura em
        boa parte dos aparelhos.
      */}
      <rect width={lado} height={lado} fill="#ffffff" />
      {modulos.map((linha, l) =>
        linha.map((escuro, c) =>
          escuro ? (
            <rect
              key={`${l}-${c}`}
              x={c + MARGEM}
              y={l + MARGEM}
              width="1"
              height="1"
              fill="#111111"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

/** Celular exibindo o QR, desenhado em CSS. */
function CelularComQr() {
  return (
    <div className="relative w-[54%] max-w-[13.5rem] shrink-0 rounded-[1.75rem] bg-[#1b1b1f] p-2 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
      {/* Recorte da câmera, o detalhe que faz o retângulo virar celular. */}
      <div className="absolute left-1/2 top-3.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/70" />

      <div className="flex aspect-9/17 items-center justify-center rounded-[1.35rem] bg-white px-3">
        <QrCode texto={linkDemonstracao} />
      </div>
    </div>
  );
}

export default function Demonstracao() {
  return (
    <section id="testar" className="border-b border-borda">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-14">
        <div className="flex items-center gap-5 rounded-3xl bg-linear-to-br from-[#3f5ef0] to-[#2440c4] px-5 py-8 sm:gap-7 sm:px-8 sm:py-10">
          <CelularComQr />

          {/*
            A chamada em caixa-alta vem da peça original e se sustenta aqui:
            é um cartaz dentro da página, não um rótulo de seção.
          */}
          <p className="display text-[1.3rem] leading-[1.12] text-white uppercase sm:text-2xl lg:text-[1.75rem]">
            Converse com a próxima IA do seu condomínio
          </p>
        </div>

        <div>
          <h2 className="display max-w-[18ch] text-3xl text-tinta sm:text-4xl">
            Teste a léia e descubra todo o seu poder
          </h2>
          <p className="mt-5 max-w-[46ch] text-base text-tinta/70 sm:text-lg">
            Aponte a câmera para o código — ou toque no botão — e faça as
            perguntas que os seus moradores fariam. É uma conta de
            demonstração, aberta, sem cadastro e sem compromisso.
          </p>

          <a
            href={linkDemonstracao}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-azul px-7 py-3.5 font-semibold text-sobre-azul transition-colors hover:bg-royal"
          >
            Conversar agora
          </a>
        </div>
      </div>
    </section>
  );
}
