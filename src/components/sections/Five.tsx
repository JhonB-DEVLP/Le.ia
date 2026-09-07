/*
  Antes: nove cards azuis idênticos com ícone de contorno — a mesma grade
  que aparece em qualquer landing de SaaS. Agora a seção mostra o que ela
  realmente quer dizer: as perguntas, com as palavras dos moradores.

  A lista é longa de propósito. O argumento é o volume — ver a extensão da
  lista é o argumento.
*/
const perguntas = [
  "Até que horas funciona a academia?",
  "Posso fazer mudança no sábado?",
  "Como faço para reservar o salão?",
  "Me manda a segunda via do boleto?",
  "Qual o valor da taxa deste mês?",
  "A obra do hall já tem data?",
  "Chegou encomenda pra mim?",
  "Cadê a ata da última assembleia?",
  "Vocês indicam algum encanador?",
  "Pode entrar com cachorro no elevador social?",
  "Que horas o porteiro da noite entra?",
  "Onde vejo o regulamento interno?",
  "A piscina está aberta amanhã?",
  "Como autorizo a entrada de visitante?",
];

export default function Five() {
  return (
    <section
      id="funcionalidades"
      className="border-y border-borda bg-papel"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <h2 className="display text-3xl text-tinta sm:text-4xl">
              Tudo isso ela já responde sozinha
            </h2>
            <p className="mt-5 max-w-[40ch] text-base text-tinta/70 sm:text-lg">
              São as perguntas que chegam todo dia, escritas do jeito que o
              morador escreve. A léia entende o que foi pedido e responde com
              a informação do seu condomínio, não com um texto genérico.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {perguntas.map((pergunta) => (
              <li
                key={pergunta}
                className="rounded-full rounded-bl-sm bg-fundo px-4 py-2.5 text-sm text-tinta/85 shadow-sm ring-1 ring-borda"
              >
                {pergunta}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
