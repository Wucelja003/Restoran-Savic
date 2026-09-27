import { motion, type Variants } from "motion/react"
import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react"
import { ease } from "../lib/motion"
import { contact, map, phoneHref } from "../lib/contact"
import GoldMap from "./GoldMap"

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <motion.li variants={item} className="group flex gap-5 border-b border-ink-line py-5 last:border-b-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">{label}</p>
        <div className="mt-1.5 text-white">{children}</div>
      </div>
    </motion.li>
  )
}

export default function Location() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Levo – kontakt podaci */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-15% 0px" }} variants={stagger}>
          <motion.div variants={item} className="flex items-center gap-4">
            <span className="streak-x" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Lokacija</span>
          </motion.div>

          <motion.h2 variants={item} className="mt-6 text-4xl leading-tight sm:text-5xl">
            Ovde možete da nas{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
              pronađete
            </span>
          </motion.h2>

          <motion.p variants={item} className="mt-5 max-w-md leading-relaxed text-white/55">
            Svratite na ručak, večeru ili porodično slavlje – čekamo vas sa toplim dočekom i domaćom kuhinjom.
          </motion.p>

          <ul className="mt-8">
            <InfoRow icon={<MapPin className="h-5 w-5" />} label="Adresa">
              <p>{contact.street}</p>
              <p className="text-sm text-white/50">{contact.city}</p>
            </InfoRow>

            <InfoRow icon={<Phone className="h-5 w-5" />} label="Telefon">
              <a href={phoneHref} className="transition-colors hover:text-gold">
                {contact.phone}
              </a>
            </InfoRow>

            <InfoRow icon={<Clock className="h-5 w-5" />} label="Radno vreme">
              <dl className="space-y-1">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap gap-x-3">
                    <dt className="text-white/50">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </InfoRow>

            <InfoRow icon={<Mail className="h-5 w-5" />} label="Email">
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-gold">
                {contact.email}
              </a>
            </InfoRow>
          </ul>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={phoneHref}
              className="btn-flow group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Pozovite nas
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:rotate-12">
                <Phone className="h-4 w-4" />
              </span>
            </a>
            <a
              href={map.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-gold/50 py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              Uputstva do nas
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-gold">
                <Navigation className="h-4 w-4" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Desno – mapa */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease }}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(55%_55%_at_50%_50%,rgba(238,191,28,0.14),transparent_70%)]" />
          <div aria-hidden className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-[2rem] border border-gold/30" />

          <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)] sm:aspect-[4/3] lg:aspect-[4/5]">
            <GoldMap className="h-full w-full" />

            <a
              href={map.place}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 z-[1000] flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/70 p-3 pl-4 backdrop-blur-md transition-colors duration-300 hover:border-gold/40 sm:right-auto"
            >
              <span className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
                </span>
                <span>
                  <span className="block font-serif text-lg leading-tight text-white">Restoran Savić</span>
                  <span className="block text-xs text-white/50">Otvori u Google mapama</span>
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
