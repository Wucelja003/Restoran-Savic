import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowRight, Info } from "lucide-react"
import PageHeader from "../components/PageHeader"
import { ease } from "../lib/motion"
import { menuCategories } from "../lib/menu"
import { menuIcons } from "../lib/menuIcons"
import { menuItems } from "../lib/menuItems"
import headerImg from "../assets/images/cevapi-2.jpg"

const MotionLink = motion.create(Link)

// Pregled jelovnika – svaka kategorija vodi na svoju stranicu (/meni/predjela …)
export default function Menu() {
  return (
    <>
      <PageHeader eyebrow="Naša ponuda" title="Meni" image={headerImg} />

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-20 sm:px-6 sm:py-28">
        {menuCategories.map((cat, i) => {
          const Icon = menuIcons[cat.id]
          const count = menuItems[cat.id].reduce((n, g) => n + g.items.length, 0)
          return (
            <MotionLink
              key={cat.id}
              to={`/meni/${cat.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease }}
              className="group relative isolate flex h-56 items-end overflow-hidden rounded-[2rem] border border-white/10 transition-colors duration-500 hover:border-gold/40 sm:h-64"
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/10" />

              <div className="flex w-full items-end justify-between gap-6 p-6 sm:p-10">
                <div>
                  <span className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold">
                    <Icon className="h-4 w-4" />
                    {String(i + 1).padStart(2, "0")} · {count} stavki
                  </span>
                  <h2 className="mt-3 text-4xl tracking-[0.08em] uppercase sm:text-6xl">{cat.name}</h2>
                  <p className="mt-2 hidden max-w-md text-white/65 sm:block">{cat.tagline}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink sm:h-14 sm:w-14">
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </MotionLink>
          )
        })}

        <div className="!mt-12 flex items-start justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center text-sm text-white/55 sm:items-center">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:mt-0" />
          <p>Sve cene su izražene u dinarima. Za alergene pitajte konobara.</p>
        </div>
      </div>
    </>
  )
}
