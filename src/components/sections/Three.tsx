import Image from "next/image";

const features = [
  {
    image: "/Three/image 9.svg",
    alt: "O poder da IA tornando tudo mais ágil",
    imageSide: "left",
    title: "O poder da IA tornando tudo mais ágil.",
    description:
      "A maior parte das dúvidas que chegam por WhatsApp não exigem interação humana. Dúvidas sobre horários, regulamento interno, taxas, reservas de áreas comuns, indicação de fornecedores e outros temas são resolvidos de forma eficiente.",
  },
  {
    image: "/Three/image 10.svg",
    alt: "A eficiência da IA e a empatia do humano",
    imageSide: "right",
    title: "A eficiência da IA e a empatia do humano",
    description:
      "Algumas vezes o morador precisa falar com um humano, seja pelo nível de urgência, seja por uma necessidade específica. Isso não é um problema para a lé.ia, que avisa às pessoas cadastradas a necessidade dessa interação.",
  },
  {
    image: "/Three/image 11.svg",
    alt: "A sua assistente, do seu jeito",
    imageSide: "left",
    title: "A sua assistente, do seu jeito",
    description:
      "Configure tom de voz, estilo de resposta, temas que podem e não podem ser abordados, o humor e até mesmo o sotaque de seu assistente de maneira super simples e rápida. Os ajustes são feitos rapidamente, sem exigir conhecimento técnico.",
  },
  {
    image: "/Three/image 12.svg",
    alt: "Sempre a informação mais atual para seu cliente",
    imageSide: "right",
    title: "Sempre a informação mais atual para seu cliente",
    description:
      "A lé.ia extrai suas informações de uma RAG, um banco de documentos fácil de atualizar. Convenção nova? Basta substituir na RAG. Mudança de horário? Na lei? Taxa Extra? Novidade? Em poucos segundos a informação está atualizada.",
  },
] as const;

export default function Three() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        Simples. Rápido. Fácil. Barato.
      </h2>

      <div className="mt-10 flex flex-col gap-12 sm:mt-16 sm:gap-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="grid grid-cols-1 items-center gap-6 sm:gap-10 md:grid-cols-2"
          >
            <div
              className={
                feature.imageSide === "right" ? "order-1 md:order-2" : "order-1"
              }
            >
              <Image
                src={feature.image}
                alt={feature.alt}
                width={403}
                height={368}
                className="h-auto w-full"
              />
            </div>

            <div
              className={
                feature.imageSide === "right" ? "order-2 md:order-1" : "order-2"
              }
            >
              <h3 className="text-2xl font-bold sm:text-3xl">
                {feature.title.split("lé.ia").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-[#4D6EFF]">lé.ia</span>
                    </span>
                  ) : (
                    part
                  ),
                )}
              </h3>
              <p className="mt-4 text-base text-black/70">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
