import Conversa, { type Mensagem } from "@/components/sections/Conversa";

/*
  Quatro recursos, cada um provado por uma conversa real em vez de uma
  ilustração genérica. A alternância de lado dá ritmo à leitura; o texto
  fica sempre alinhado à esquerda.

  As conversas foram escolhidas para mostrar exatamente o que o texto ao
  lado afirma — o repasse para humano aparece como repasse, a atualização
  de documento aparece com a informação nova já na resposta.
*/
type Recurso = {
  titulo: string;
  descricao: string;
  ladoDaConversa: "esquerda" | "direita";
  conversa: readonly Mensagem[];
};

const recursos: readonly Recurso[] = [
  {
    titulo: "A maior parte das perguntas não precisa de gente",
    descricao:
      "Horário da piscina, regra de mudança, taxa em atraso, telefone do porteiro. São perguntas repetidas que consomem o dia da equipe e que a léia responde na hora, com a informação certa do seu condomínio.",
    ladoDaConversa: "esquerda",
    conversa: [
      { de: "morador", texto: "Até que horas posso usar a piscina?", hora: "09:12" },
      {
        de: "leia",
        texto:
          "A piscina funciona das 8h às 22h de terça a domingo. Às segundas fica fechada para limpeza.",
        hora: "09:12",
      },
    ],
  },
  {
    titulo: "E quando precisa, ela chama você",
    descricao:
      "A léia reconhece urgência e assunto delicado. Nesses casos ela não improvisa: avisa na hora a pessoa responsável e diz ao morador que alguém já foi acionado.",
    ladoDaConversa: "direita",
    conversa: [
      {
        de: "morador",
        texto: "Tem água vazando do teto da garagem, tá alagando!",
        hora: "23:04",
      },
      {
        de: "leia",
        texto:
          "Isso precisa de atendimento imediato. Já avisei o síndico e a empresa de manutenção agora.\n\nPode me mandar uma foto do ponto do vazamento?",
        hora: "23:04",
      },
    ],
  },
  {
    titulo: "Ela fala do jeito do seu condomínio",
    descricao:
      "Tom de voz, formalidade, assuntos permitidos e proibidos, até o sotaque. Tudo se ajusta em minutos, sem depender de time técnico e sem escrever uma linha de código.",
    ladoDaConversa: "esquerda",
    conversa: [
      { de: "morador", texto: "Oi, boa tarde. Chegou encomenda pra mim?", hora: "14:30" },
      {
        de: "leia",
        texto:
          "Oi, Seu Antônio! Tem sim, uma caixa chegou hoje às 11h e está na portaria, viu?",
        hora: "14:30",
      },
    ],
  },
  {
    titulo: "Mudou a regra, mudou a resposta",
    descricao:
      "As informações vivem em uma base de documentos que você atualiza sozinho. Convenção nova, taxa extra, mudança de horário: substitui o documento e a resposta muda em segundos, para todo mundo.",
    ladoDaConversa: "direita",
    conversa: [
      { de: "morador", texto: "Qual o valor da taxa de mudança agora?", hora: "16:58" },
      {
        de: "leia",
        texto:
          "A taxa passou a ser R$ 180 desde a assembleia do dia 3. O agendamento continua sendo feito com 48h de antecedência.",
        hora: "16:58",
      },
    ],
  },
] as const;

export default function Three() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="display max-w-[18ch] text-3xl text-tinta sm:text-4xl lg:text-[2.75rem]">
        O que acontece quando o WhatsApp do condomínio para de tocar
      </h2>

      <div className="mt-14 flex flex-col gap-16 sm:mt-20 sm:gap-24">
        {recursos.map((recurso) => (
          <article
            key={recurso.titulo}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            {/*
              No empilhamento de celular o título vem antes da conversa
              (order-2/order-1): a prova só faz sentido depois da afirmação.
              A alternância de lados volta a valer a partir de md.
            */}
            <div
              className={
                recurso.ladoDaConversa === "direita"
                  ? "order-2 md:order-2"
                  : "order-2 md:order-1"
              }
            >
              <Conversa
                mensagens={recurso.conversa}
                comCabecalho={false}
                className="mx-auto max-w-[24rem] md:max-w-none"
              />
            </div>

            <div
              className={
                recurso.ladoDaConversa === "direita"
                  ? "order-1 md:order-1"
                  : "order-1 md:order-2"
              }
            >
              <h3 className="display text-2xl text-tinta sm:text-3xl">
                {recurso.titulo}
              </h3>
              <p className="mt-4 max-w-[46ch] text-base text-tinta/70 sm:text-lg">
                {recurso.descricao}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
