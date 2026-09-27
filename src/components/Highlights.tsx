import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Reveal from "./Reveal"
import cevapi from "../assets/images/cevapi.jpg"
import lignje from "../assets/images/lignje-2.jpg"
import losos from "../assets/images/losos-3.jpg"
import pecurke from "../assets/images/pecurke-2.jpg"

// TODO: prave kategorije jela
const featured = [
  { name: "Ćevapi u sosu", category: "Sa roštilja", image: cevapi },
  { name: "Lignje", category: "Plodovi mora", image: lignje },
  { name: "Losos", category: "Riba", image: losos },
  { name: "Punjene pečurke", category: "Predjelo", image: pecurke },
]

export default function Highlights() {
  return (
    <section className="relative pb-28 sm:pb-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Naslov levo, dugme desno */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="streak-x" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Još iz naše kuhinje</span>
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              Šta još{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
                izdvajamo
              </span>
            </h2>
          </div>

          <Link
            to="/meni"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-gold/50 py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink md:self-auto"
          >
            Pogledaj ceo meni
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>

        {/* Kartice – svaka druga spuštena, za "stepenast" izgled */}
        <div className="mt-14 grid grid-cols-2 items-start gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((dish, i) => (
            <div key={dish.name} className={i % 2 === 1 ? "mt-10 lg:mt-16" : ""}>
              <Reveal delay={i * 0.1}>
                <Link
                  to="/meni"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 transition-colors duration-500 hover:border-gold/40"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100 sm:right-4 sm:top-4 -rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>

                  <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{dish.category}</p>
                    <p className="mt-1 font-serif text-lg text-white sm:text-2xl">{dish.name}</p>
                    <span className="mt-3 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
