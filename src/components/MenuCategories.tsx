import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Reveal from "./Reveal"
import { ease } from "../lib/motion"
import { menuCategories } from "../lib/menu"
import { menuIcons } from "../lib/menuIcons"

const MotionLink = motion.create(Link)

export default function MenuCategories() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Naslov */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="streak-x" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Jelovnik</span>
            </div>
            <h2 className="mt-6 max-w-xl text-4xl leading-tight sm:text-5xl">
              Pogledajte šta vas čeka{" "}
              <span className="whitespace-nowrap">
                <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
                  za našim stolom
                </span>
                <span className="text-gold">.</span>
              </span>
            </h2>
          </div>

          <Link
            to="/meni"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-gold/50 py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink md:self-auto"
          >
            Ceo jelovnik
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>

        {/* Kartice: na desktopu se kartica na hover raširi, a ostale suze */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:h-[560px]">
          {menuCategories.map((cat, i) => {
            const Icon = menuIcons[cat.id]
            return (
              <MotionLink
                key={cat.id}
                to={`/meni#${cat.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
                className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-white/10 transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:aspect-auto lg:basis-0 lg:grow lg:hover:grow-[2.2] lg:focus-visible:grow-[2.2]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 transition-opacity duration-700 group-hover:opacity-80" />

                {/* Broj i ikonica */}
                <div className="absolute inset-x-4 top-4 flex items-start justify-between sm:inset-x-5 sm:top-5">
                  <span className="font-serif text-sm text-white/70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink/40 text-gold backdrop-blur-md transition-colors duration-500 group-hover:bg-gold group-hover:text-ink sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>

                {/* Naziv i opis */}
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-6">
                  <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl lg:whitespace-nowrap">{cat.name}</h3>
                  <p className="mt-2 hidden max-w-xs text-sm leading-relaxed text-white/65 sm:block lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                    {cat.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Pogledaj
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </MotionLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
