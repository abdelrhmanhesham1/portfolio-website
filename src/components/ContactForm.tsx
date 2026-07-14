"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profile } from "@/content/profile";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "@/content/site-config";

const contactSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please write a message (at least 10 characters)."),
  // Honeypot — humans never see or fill this
  botcheck: z.string().max(0).optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

const inputClasses =
  "w-full rounded-lg border border-navy-800 bg-navy-950/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-cyan-400 focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${data.firstName} ${data.lastName}`,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          message: data.message,
          botcheck: data.botcheck,
        }),
      });
      const json = (await res.json()) as { success: boolean };
      if (!json.success) throw new Error("submission rejected");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="bg-grad-card flex h-full flex-col items-center justify-center rounded-2xl border border-green-400/40 p-10 text-center"
      >
        <p className="font-display text-xl font-semibold text-green-400">Message sent ✓</p>
        <p className="mt-3 text-sm text-muted">Thanks — I&apos;ll reply within 24 hours.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-cyan-400 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-grad-card rounded-2xl border border-navy-800 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First name
          </label>
          <input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={inputClasses}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1.5 text-xs text-amber-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last name
          </label>
          <input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={inputClasses}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p id="lastName-error" className="mt-1.5 text-xs text-amber-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-amber-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClasses}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-amber-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="checkbox"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        {...register("botcheck")}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-grad-cta mt-7 w-full rounded-full px-6 py-3 font-semibold text-navy-950 shadow-[0_8px_32px_rgba(255,138,61,0.25)] transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-4 text-center text-sm text-amber-400">
          Something went wrong sending your message. Please email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
