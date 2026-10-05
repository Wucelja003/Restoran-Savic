import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Reveal from "./Reveal"

// Slike ambijenta (iz public/POST, smanjene) – src/assets/ambijent/ambijent-1..8.jpg
const images = Object.values(
  import.meta.glob<string>("../assets/ambijent/*.jpg", { eager: true, import: "default" }),
)

// Kolone zida: svaka kreće od druge slike, ide u svom smeru i svojom brzinom
const columns = [
  { start: 0, duration: 48, reverse: false },
  { start: 3, duration: 62, reverse: true },
  { start: 5, duration: 54, reverse: false },
  { start: 1, duration: 70, reverse: true, desktop: true },
  { start: 6, duration: 58, reverse: false, desktop: true },
  { start: 2, duration: 66, reverse: true, desktop: true },
]

function Column({ start, duration, reverse, desktop }: (typeof columns)[number]) {
  // Redosled slika za ovu kolonu, dupliran da petlja bude bez skoka
  const ordered = [...images.slice(start), ...images.slice(0, start)]
  const doubled = [...ordered, ...ordered]
  return (
    <div className={`w-40 shrink-0 sm:w-52 lg:w-56 ${desktop ? "hidden md:block" : ""}`}>
      <div
        className={`marquee-y ${reverse ? "marquee-y-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="mb-4 aspect-[4/5] w-full rounded-[1.25rem] object-cover sm:mb-5"
          />
        ))}
      </div>
    </div>
  )
}

export default function Ambience() {
  return (
    <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden border-t border-ink-line py-28 sm:min-h-[760px]">
      {/* Pozadina: iskošen zid slika koje se same kreću – samo za gledanje, ne reaguje na miš */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none [perspective:1200px]">
        <div className="absolute left-1/2 top-1/2 flex gap-4 [transform:translate(-50%,-50%)_rotateX(18deg)_rotateZ(-12deg)_scale(1.25)] sm:gap-5">
          {columns.map((col, i) => (
            <Column key={i} {...col} />
          ))}
        </div>

        {/* Zatamnjenje: najtamnije u sredini (iza teksta) i na ivicama sekcije */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(0,0,0,0.85),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </div>

      {/* Sadržaj preko slika */}
      <Reveal className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="streak-x hidden sm:block" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Ambijent</span>
          <span className="streak-x hidden sm:block" />
        </div>
        <h2 className="mt-6 text-5xl leading-tight sm:text-6xl lg:text-7xl">
          Topla atmosfera
          <br />
          <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
            kao nekada
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
          Drvo, meka svetlost i postavljeni stolovi – mesto gde vreme sporije teče.
        </p>
        <Link
          to="/galerija"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-ink/40 py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-md transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
        >
          Pogledaj galeriju
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
