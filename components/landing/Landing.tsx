import Link from "next/link";

// Named export. Fix this path if your toggle file lives elsewhere.
import { ThemeToggle } from "../theme/theme-toggle";

import RepoForm from "./RepoForm";
import { CategoriesFigure, ExplainFigure, HeroFigure, ImportsFigure } from "./Illustrations";

const column = "mx-auto w-full max-w-[1140px] px-6";
const section = "py-32";
const eyebrow = "font-mono text-[13px] uppercase tracking-[0.14em] text-accent";
const h2 = "mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-foreground";
const card = "rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/50";

const frameworks = [
  {
    name: "Next.js",
    items: ["Page routes", "API endpoints", "Server actions", "Layouts", "Loading and error UI", "Middleware", "Metadata files", "Instrumentation"],
  },
  {
    name: "Express-style services",
    items: ["Routers", "Controllers", "Services", "Models", "Middleware", "Utilities"],
  },
];

const steps = [
  ["Read one commit", "Every file and every import is parsed, so the map comes from what the code does, not from folder names."],
  ["Sort the files", "Known conventions decide what a file is. What they miss stays unclassified, and a model labels what it can."],
  ["Explain on request", "Click a file and a model reads its source and the files around it. The answer is cached and traced."],
];

const refusals = [
  ["It does not run your code.", "Source is read from GitHub at the commit that was analysed. Nothing is executed."],
  ["It does not pretend an answer is current.", "If a file has changed since the analysis, the explanation says so and offers a re-run."],
  ["It does not trust the model on paths.", "A path the model mentions but was never shown is flagged on the screen."],
  ["It does not hide where an answer came from.", "Each one names the model, whether it was cached, and where it was traced."],
];

function GridBackdrop() {
  const mask = "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" className="stroke-line" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-accent">
      <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted">
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur-md">
        <div className={`${column} flex h-16 items-center justify-between`}>
          <Link href="/" className="flex items-center gap-2.5 font-mono text-[19px] font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-[13px] text-white">A</span>
            Actmap
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="rounded-full border border-line px-4 py-2 text-[14px] transition-colors hover:bg-surface-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative isolate pb-24 pt-20 sm:pt-28">
          <GridBackdrop />
          <div className={`${column} text-center`}>
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-[13px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Reads one commit. Explains every file.
            </p>

            <h1 className="mx-auto mt-8 max-w-[16ch] text-[clamp(2.8rem,7.2vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              See how any repository{" "}
              <span className="bg-gradient-to-r from-foreground via-accent to-accent bg-clip-text text-transparent">fits together.</span>
            </h1>

            <p className="mx-auto mb-10 mt-7 max-w-[52ch] text-[18px] leading-8 text-muted">
              Actmap reads a commit, sorts every file into what it is, and draws the imports between folders. Click a file and
              it is explained in plain English.
            </p>

            <RepoForm />
          </div>

          <div className={`${column} mt-20`}>
            <div className="rounded-3xl border border-line bg-surface p-3 shadow-[0_40px_120px_-40px] shadow-accent/30">
              <div className="flex items-center gap-2 px-3 pb-3 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-3 h-2 w-40 rounded-full bg-line" />
              </div>
              <div className="rounded-2xl border border-line bg-surface-2/40 p-4 sm:p-8">
                <HeroFigure />
              </div>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className={`${section} border-t border-line`}>
          <div className={column}>
            <p className={eyebrow}>What it does</p>
            <h2 className={`${h2} max-w-[18ch]`}>A codebase you have never opened, in one view.</h2>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              <div className={`${card} md:col-span-2`}>
                <h3 className="text-[20px] font-medium tracking-tight">Every file, sorted by what it is.</h3>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-7 text-muted">
                  Routes, components, hooks, middleware, config and tests, each with a count, so a flat list of files becomes
                  something you can read.
                </p>
                <div className="mt-8 max-w-[34rem]">
                  <CategoriesFigure />
                </div>
              </div>

              <div className="grid gap-5">
                <div className={card}>
                  <h3 className="text-[18px] font-medium tracking-tight">Imports as a map.</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">Folders are nodes, imports are the lines between them.</p>
                  <div className="mt-6">
                    <ImportsFigure />
                  </div>
                </div>
              </div>

              <div className={`${card} md:col-span-3 grid items-center gap-x-20 gap-y-8 md:grid-cols-[1fr_1fr]`}>
                <div>
                  <h3 className="text-[20px] font-medium tracking-tight">Click a file, get the story.</h3>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-7 text-muted">
                    A model reads the file and every file it imports or is imported by, then writes what it does, what it
                    depends on and who uses it. Every path in the answer is a link back to the map.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-[22rem]">
                  <ExplainFigure />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={`${section} border-t border-line`}>
          <div className={column}>
            <p className={eyebrow}>How it works</p>
            <h2 className={`${h2} max-w-[16ch]`}>Three steps, nothing hidden.</h2>

            <ol className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
              {steps.map(([title, body], i) => (
                <li key={title} className="border-t border-line pt-8">
                  <span className="font-mono text-[44px] font-medium leading-none tracking-tight text-accent/80">0{i + 1}</span>
                  <p className="mt-6 text-[19px] font-medium tracking-tight">{title}</p>
                  <p className="mt-3 max-w-[40ch] text-[16px] leading-7 text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Frameworks */}
        <section className={`${section} border-t border-line`}>
          <div className={column}>
            <p className={eyebrow}>Frameworks</p>
            <h2 className={`${h2} max-w-[20ch]`}>Conventions it understands.</h2>
            <p className="mt-6 max-w-[64ch] text-[17px] leading-7 text-muted">
              These are recognised without asking a model. A file that matches none of them is shown as unclassified rather than
              guessed.
            </p>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {frameworks.map((group) => (
                <div key={group.name} className={card}>
                  <p className="text-[19px] font-medium tracking-tight">{group.name}</p>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 font-mono text-[13px] text-muted">
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What it doesn't do */}
        <section className={`${section} border-t border-line`}>
          <div className={column}>
            <p className={eyebrow}>Limits, on purpose</p>
            <h2 className={`${h2} max-w-[20ch]`}>What it deliberately doesn’t do.</h2>
            <p className="mt-6 max-w-[64ch] text-[17px] leading-7 text-muted">
              Each of these is something you can check on the screen after one analysis.
            </p>

            <ul className="mt-14 grid gap-5 md:grid-cols-2">
              {refusals.map(([title, body]) => (
                <li key={title} className={`${card} flex gap-4`}>
                  <Cross />
                  <div>
                    <p className="text-[18px] font-medium tracking-tight">{title}</p>
                    <p className="mt-2 max-w-[46ch] text-[16px] leading-7 text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="pb-32">
          <div className={column}>
            <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-6 py-20 text-center sm:px-16">
              <div aria-hidden="true" className="absolute left-1/2 top-[-10rem] -z-10 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[110px]" />
              <h2 className="mx-auto max-w-[16ch] text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Try it on a repository you know.
              </h2>
              <p className="mx-auto mb-9 mt-5 max-w-[46ch] text-[17px] leading-7 text-muted">
                You will recognise your own code in the map within thirty seconds.
              </p>
              <RepoForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10">
        <div className={`${column} flex items-center justify-between text-[13px] text-muted`}>
          <span className="font-mono">actmap</span>
          <Link href="/sign-in" className="transition-colors hover:text-foreground">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}