import { ParticleField } from "./ParticleField";

/**
 * Fixed atmospheric layer sitting behind the entire page.
 *
 * The aurora is pure CSS — three blurred radial blobs animated with
 * transforms only, so it runs on the compositor and costs no main-thread
 * work. The interactive constellation is layered on top of it.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* Aurora */}
      <div className="absolute -top-[22vh] -left-[12vw] size-[62vw] min-w-[420px] animate-drift rounded-full bg-iris-600/22 blur-[120px]" />
      <div
        className="absolute top-[18vh] -right-[14vw] size-[52vw] min-w-[380px] animate-drift rounded-full bg-aqua-500/14 blur-[130px]"
        style={{ animationDelay: "-7s", animationDuration: "26s" }}
      />
      <div
        className="absolute bottom-[-18vh] left-[24vw] size-[46vw] min-w-[340px] animate-drift rounded-full bg-mint-500/10 blur-[140px]"
        style={{ animationDelay: "-14s", animationDuration: "30s" }}
      />

      {/* Blueprint grid, masked to fade at the edges */}
      <div className="absolute inset-0 bg-grid opacity-70" />

      {/* Vignette keeps text contrast high over the brightest blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,transparent_35%,var(--color-ink-950)_100%)]" />

      <ParticleField />
    </div>
  );
}
