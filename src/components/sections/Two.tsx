import Image from "next/image";

/*
  Faixa de credibilidade, centralizada logo abaixo do hero.

  Cada marca tem duas versões (uma por tema) em que o SÍMBOLO mantém as
  cores oficiais nos dois modos — o degradê do Gemini, o laranja do Claude,
  o anel do Meta — e só o wordmark acompanha a cor do texto da página.

  É o uso que as próprias diretrizes preveem para fundo escuro. A
  alternativa seria um filtro CSS invertendo a arte, mas inverter altera as
  cores da marca, que é justamente o que essas diretrizes proíbem. Três das
  artes (ChatGPT, Perplexity e WhatsApp) já são monocromáticas na origem, de
  modo que nelas não há cor a preservar.

  Geradas a partir dos arquivos originais, que seguem em `arquivo-design/`.
*/
const tecnologias = [
  { nome: "ChatGPT", arquivo: "Chatgpt", largura: 286 },
  { nome: "Gemini", arquivo: "Gemini", largura: 372 },
  { nome: "Claude", arquivo: "Claude", largura: 391 },
  { nome: "Perplexity", arquivo: "Perplexity", largura: 333 },
  { nome: "Meta AI", arquivo: "Meta", largura: 308 },
  { nome: "WhatsApp", arquivo: "Whatsapp", largura: 231 },
];

/** Altura dos arquivos monocromáticos: 28px de exibição em 3x. */
const ALTURA_ARQUIVO = 84;

export default function Two() {
  return (
    <section className="border-b border-borda">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-center text-sm text-tinta">
          Construída sobre os modelos de linguagem e a infraestrutura de
          mensagens que já movem o mercado
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {tecnologias.map((tech) => (
            <div key={tech.nome} className="relative h-6 sm:h-7">
              {/*
                As duas versões ficam no HTML e o tema decide qual aparece.
                Alternar por CSS evita o piscar que haveria ao trocar o `src`
                na hidratação, e a versão oculta não é baixada porque ambas
                já vêm no mesmo pacote de imagens otimizadas.
              */}
              <Image
                src={`/tecnologias/${tech.arquivo}-claro.png`}
                alt={tech.nome}
                width={tech.largura}
                height={ALTURA_ARQUIVO}
                className="h-full w-auto dark:hidden"
              />
              <Image
                src={`/tecnologias/${tech.arquivo}-escuro.png`}
                alt=""
                aria-hidden="true"
                width={tech.largura}
                height={ALTURA_ARQUIVO}
                className="hidden h-full w-auto dark:block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
