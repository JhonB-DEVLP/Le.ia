"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";

  if (!name || !email || !phone) {
    return { status: "error", message: "Preencha todos os campos." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Informe um e-mail válido." };
  }

  try {
    await resend.emails.send({
      from: "lé.ia <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO!,
      replyTo: email,
      subject: `Novo contato pelo site: ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}`,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Telefone:</strong> ${phone}</p>`,
    });
  } catch {
    return {
      status: "error",
      message: "Não foi possível enviar sua mensagem. Tente novamente.",
    };
  }

  return {
    status: "success",
    message: "Obrigado, nossa equipe comercial irá entrar em contato.",
  };
}
