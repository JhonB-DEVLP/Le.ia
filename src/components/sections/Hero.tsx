import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        Até <span className="text-[#4D6EFF]">95%</span> das dúvidas dos
        moradores do condomínio solucionadas por{" "}
        <span className="text-[#4D6EFF]">lé.ia</span>, sua nova assistente.
      </p>
      <p className="mt-4 text-center text-base text-black/70 sm:text-lg">
        Enlouquecer com a avalanche diária de consultas, dúvidas e
        questionamento agora é uma escolha sua.
      </p>
      <Image
        src="/ImageHero.svg"
        alt="lé.ia"
        width={2574}
        height={1632}
        quality={100}
        priority
        className="mt-8 h-auto w-full sm:mt-10"
      />
    </section>
  );
}
