import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import Reveal from "./Reveal"
import { ease } from "../lib/motion"
import { contact, phoneHref } from "../lib/contact"
import { services } from "../lib/reservations"

const MotionLink = motion.create(Link)

// Tri vrste rezervacije (sto, proslave, ketering) – svaka kartica vodi na svoju karticu na stranici Rezervacija
export default function ReservationOptions() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-line py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(238,191,28,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Naslov levo, telefon desno */}
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="streak-x" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Rezervacije</span>
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              Rezervišite{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">kod nas</span>
            </h2>
            <p className="mt-4 max-w-md text-white/55">Sto za vaše društvo, sala za slavlje ili naša kuhinja na vašem događaju.</p>
          </div>

          <a
            href={phoneHref}
            className="group inline-flex items-center gap-4 self-start rounded-full border border-white/10 bg-white/[0.02] py-2 pl-2 pr-6 transition-colors duration-300 hover:border-gold/40 md:self-auto"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:rotate-12">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/45">Ili nas pozovite</span>
              <span className="block font-serif text-lg text-white transition-colors group-hover:text-gold">{contact.phone}</span>
            </span>
          </a>
        </Reveal>

        {/* Kartice */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <MotionLink
                key={s.id}
                to={`/rezervacija#${s.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
                className="group relative isolate flex h-[440px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-6 transition-[border-color,translate] duration-500 hover:-translate-y-1.5 hover:border-gold/40 sm:h-[480px] sm:p-7"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/15" />

                {/* Gore: ikonica i broj */}
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ink/40 text-gold backdrop-blur-md transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-sm text-white/60">0{i + 1}</span>
                </div>

                {/* Dole: naslov, podnaslov i poziv */}
                <div>
                  <h3 className="text-3xl sm:text-[2.1rem]">{s.title}</h3>
                  <span className="mt-4 block h-px w-10 bg-gold transition-all duration-700 group-hover:w-20" />
                  <p className="mt-4 font-old text-lg leading-snug text-white/75 italic">{s.subtitle}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rezerviši</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </MotionLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
