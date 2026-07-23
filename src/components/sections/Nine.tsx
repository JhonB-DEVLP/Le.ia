"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer rounded-[5px] bg-[#4D6EFF] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3d5ce6] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

export default function Nine() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  return (
    <section id="fale-conosco" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        Fale com a gente
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-base text-black/70">
        Deixe seus dados e nossa equipe comercial entra em contato para
        apresentar a Léia para o seu condomínio.
      </p>

      {state.status === "success" ? (
        <div className="mt-10 rounded-2xl border border-[#4D6EFF]/20 bg-[#E4E8FB] p-8 text-center">
          <p className="font-semibold text-black">{state.message}</p>
        </div>
      ) : (
        <form action={formAction} className="mt-10 flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-black"
            >
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-[5px] border border-black/10 px-4 py-3 text-black outline-none focus:border-[#4D6EFF]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-black"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-[5px] border border-black/10 px-4 py-3 text-black outline-none focus:border-[#4D6EFF]"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-black"
            >
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-[5px] border border-black/10 px-4 py-3 text-black outline-none focus:border-[#4D6EFF]"
            />
          </div>

          {state.status === "error" && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}

          <div className="flex justify-center sm:justify-end">
            <SubmitButton />
          </div>
        </form>
      )}
    </section>
  );
}
