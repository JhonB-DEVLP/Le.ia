import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-center text-4xl font-semibold">
        Até <span className="text-[#4D6EFF]">95%</span> das dúvidas dos
        moradores do condomínio solucionadas por{" "}
        <span className="text-[#4D6EFF]">lé.ia</span>, sua nova assistente.
      </p>
      <p className="mt-4 text-center text-lg text-black/70">
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
        className="mt-10 h-auto w-full"
      />
    </section>
  );
}
