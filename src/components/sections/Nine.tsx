"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const campos = [
  { id: "name", label: "Nome", type: "text", autoComplete: "name" },
  { id: "email", label: "E-mail", type: "email", autoComplete: "email" },
  { id: "phone", label: "Telefone", type: "tel", autoComplete: "tel" },
] as const;

function BotaoEnviar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-full bg-azul px-8 py-3.5 font-semibold text-sobre-azul transition-colors hover:bg-royal disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Enviar meus dados"}
    </button>
  );
}

export default function Nine() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  return (
    <section id="fale-conosco" className="border-t border-borda">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="display max-w-[16ch] text-3xl text-tinta sm:text-4xl">
            Vamos ver a léia no seu condomínio
          </h2>
          <p className="mt-5 max-w-[42ch] text-base text-tinta/70 sm:text-lg">
            Deixe seus dados e a equipe comercial entra em contato para montar
            uma demonstração com as regras e os documentos do seu condomínio.
          </p>
        </div>

        {state.status === "success" ? (
          /* O sucesso confirma o que acontece a seguir, em vez de só agradecer. */
          <div className="self-start rounded-2xl border border-azul/30 bg-papel p-8">
            <p className="display text-xl text-tinta">Dados recebidos</p>
            <p className="mt-3 text-base text-tinta/70">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="flex flex-col gap-5">
            {campos.map((campo) => (
              <div key={campo.id}>
                <label
                  htmlFor={campo.id}
                  className="mb-2 block text-sm font-medium text-tinta"
                >
                  {campo.label}
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  autoComplete={campo.autoComplete}
                  required
                  className="w-full rounded-xl border border-borda-forte bg-fundo px-4 py-3 text-tinta outline-none transition-colors focus:border-azul"
                />
              </div>
            ))}

            {state.status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                {state.message}
              </p>
            )}

            <div className="mt-1">
              <BotaoEnviar />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
