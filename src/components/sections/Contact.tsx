"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { contactChannels, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const channelIcon = { email: Mail, phone: Phone, location: MapPin } as const;

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell me your name.";
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = "A valid email so I can reply.";
    if (values.message.trim().length < 10)
      next.message = "A sentence or two about what you have in mind.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    // Static site: hand off to the visitor's mail client with everything
    // pre-filled, rather than pretending to run a server.
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the mailto link beside it still works.
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        align="center"
        title={
          <>
            Get in <span className="text-gradient">touch</span>
          </>
        }
        lede="Questions about the methodology behind any project, or the code that produced it — the fastest ways to reach me are below."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Channels */}
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <ul className="space-y-3">
              {contactChannels.map((channel) => {
                const Icon = channelIcon[channel.id as keyof typeof channelIcon];
                const inner = (
                  <GlassCard
                    className="flex items-center gap-4 p-4"
                    glow={false}
                    spotlight={false}
                    lift={Boolean(channel.href)}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-iris-500/12 text-iris-300 ring-1 ring-iris-500/20">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.8125rem] font-medium text-mist-100">
                        {channel.value}
                      </p>
                      <p className="truncate text-xs text-mist-500">{channel.hint}</p>
                    </div>
                    {channel.href && (
                      <ArrowUpRight
                        className="size-4 shrink-0 text-mist-500 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                        aria-hidden
                      />
                    )}
                  </GlassCard>
                );

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="block"
                        aria-label={`${channel.label}: ${channel.value}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Socials + copy email */}
            <div className="mt-auto flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-mist-50/10 bg-mist-50/4 px-4 py-2.5 text-sm font-medium text-mist-200 transition-colors hover:bg-mist-50/8 hover:text-mist-50"
              >
                {copied ? (
                  <Check className="size-4 text-mint-400" aria-hidden />
                ) : (
                  <Copy className="size-4" aria-hidden />
                )}
                {copied ? "Copied!" : "Copy email"}
              </button>

              <div className="ml-auto flex items-center gap-2">
                {[
                  { href: site.github, label: "GitHub", Icon: GithubIcon },
                  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-mist-50/10 bg-mist-50/4 text-mist-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-mist-50/20 hover:bg-mist-50/10 hover:text-mist-50 motion-reduce:hover:translate-y-0"
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <GlassCard className="p-6 md:p-8" spotlight={false}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[20rem] flex-col items-center justify-center text-center"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-mint-500/12 text-mint-300 ring-1 ring-mint-500/25">
                    <Check className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-mist-50">
                    Your email client is open
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-mist-400">
                    I&apos;ve pre-filled a message to {site.email}. Just hit send — I&apos;ll
                    get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-medium text-iris-300 underline decoration-iris-400/30 underline-offset-4 transition-colors hover:decoration-iris-400"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <Field
                    id="name"
                    label="Name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                    placeholder="Jane Recruiter"
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                  <Field
                    id="message"
                    label="Message"
                    value={values.message}
                    error={errors.message}
                    onChange={(v) => setValues((s) => ({ ...s, message: v }))}
                    placeholder="A quick note about the role or project…"
                    multiline
                  />

                  <button
                    type="submit"
                    className="group/btn relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-iris-500 to-iris-600 font-medium text-white shadow-[0_10px_36px_-12px_var(--color-iris-500)] transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full motion-reduce:hidden"
                    />
                    <Send className="size-[18px]" aria-hidden />
                    Send message
                  </button>

                  <p className="text-center text-xs text-mist-500">
                    Opens in your email app — no data is stored or sent anywhere else.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  multiline,
  autoComplete,
}: FieldProps) {
  const shared = cn(
    "w-full rounded-xl border bg-ink-950/50 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-500 transition-colors duration-200",
    "focus:outline-none focus-visible:outline-none",
    error
      ? "border-red-400/50 focus:border-red-400/70"
      : "border-mist-50/10 focus:border-iris-400/60",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.8125rem] font-medium text-mist-200"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
