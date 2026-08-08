/**
 * Blocos de montagem compartilhados pelas páginas legais
 * (política de privacidade e termos de uso), para que os dois documentos
 * tenham a mesma estrutura visual.
 */

export function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-black sm:text-2xl">{titulo}</h2>
      {children}
    </section>
  );
}

export function Lista({ itens }: { itens: React.ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[#4D6EFF]">
      {itens.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Destaque do rótulo que abre alguns itens de lista. */
export function Termo({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-black">{children}</strong>;
}

export function EmailContato({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-medium text-[#4D6EFF] hover:underline"
    >
      {email}
    </a>
  );
}

/** Cabeçalho padrão dos documentos legais. */
export function CabecalhoLegal({
  titulo,
  subtitulo,
  atualizadoEm,
}: {
  titulo: string;
  subtitulo: string;
  atualizadoEm: string;
}) {
  return (
    <>
      <h1 className="text-3xl font-semibold text-black sm:text-4xl">
        {titulo}
      </h1>
      <p className="mt-3 text-black/70">{subtitulo}</p>
      <p className="mt-1 text-sm text-black/50">
        Última atualização: {atualizadoEm}
      </p>
    </>
  );
}
