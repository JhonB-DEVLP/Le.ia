import Image from "next/image";

const technologies = [
  { src: "/Chatgpt.svg", alt: "ChatGPT", width: 109, height: 32 },
  { src: "/Gemini.svg", alt: "Gemini", width: 98, height: 22 },
  { src: "/Claude.svg", alt: "Claude", width: 112, height: 24 },
  { src: "/Perplexity.svg", alt: "Perplexity", width: 144, height: 36 },
  { src: "/Meta.svg", alt: "Meta", width: 109, height: 30 },
  { src: "/Whatsapp.svg", alt: "WhatsApp", width: 138, height: 39 },
];

export default function Two() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-center text-2xl font-semibold">
        Desenvolvida com as melhores tecnologias do mercado
      </h2>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {technologies.map((tech) => (
          <Image
            key={tech.alt}
            src={tech.src}
            alt={tech.alt}
            width={tech.width}
            height={tech.height}
            className="h-8 w-auto"
          />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-[3fr_2fr]">
        <div className="mx-auto w-full max-w-lg">
          <Image
            src="/Qrcode.svg"
            alt="QR code para testar a lé.ia"
            width={400}
            height={400}
            className="h-auto w-full"
          />
        </div>

        <div>
          <h3 className="text-3xl font-bold">
            Teste a <span className="text-[#4D6EFF]">lé.ia</span> e descubra
            todo o seu poder
          </h3>
          <p className="mt-4 text-base text-black/70">
            Leia o QRcode - ou clique no botão abaixo - e converse com uma
            conta demonstração, veja nossa tecnologia funcionando com seus
            próprios olhos.
          </p>
          <button
            type="button"
            className="mt-6 rounded-[5px] bg-[#4D6EFF] px-6 py-3 font-medium text-white transition-colors hover:bg-[#3d5ce6]"
          >
            Conversar
          </button>
        </div>
      </div>
    </section>
  );
}
