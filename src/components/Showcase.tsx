import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, type Variants } from "motion/react"
import { ease } from "../lib/motion"
import bigImg from "../assets/pecenje/pecenje-veliko.jpg"
import pecenjeImg from "../assets/pecenje/pecenje.jpg"
import rakijaImg from "../assets/pecenje/rakija.jpg"
import stoImg from "../assets/pecenje/sto.jpg"

// TODO: proveriti tekstove sa vlasnikom
const rows = [
  {
    image: pecenjeImg,
    alt: "Pečenje na tacni",
    subtitle: "Ponos naše kuće",
    title: "Pečenje kao nekada",
    text: "Pečeno polako, satima, dok korica ne postane zlatna i hrskava, a meso toliko mekano da se topi. Recept po kome nas gosti pamte generacijama.",
    link: { to: "/meni#glavna-jela", label: "Glavna jela" },
  },
  {
    image: rakijaImg,
    alt: "Domaća rakija od šljive",
    subtitle: "Uz svaki zalogaj",
    title: "Domaća rakija",
    text: "Pažljivo birane domaće rakije – savršen početak obroka i najbolji povod da se ostane još malo.",
    link: { to: "/meni#pica", label: "Karta pića" },
  },
  {
    image: stoImg,
    alt: "Postavljen sto u restoranu",
    subtitle: "Za veće društvo",
    title: "Slavlja i proslave",
    text: "Porodična okupljanja, slave i proslave – spremamo pečenje i punu trpezu za vaše društvo, po vašoj meri.",
    link: { to: "/rezervacija", label: "Rezerviši sto" },
  },
]

const textStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const textItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  // Blagi parallax velike slike
  const bigY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section ref={sectionRef} className="relative border-y border-ink-line">
      {/* Linije između polja dobijamo preko gap-px na tamnoj pozadini */}
      <div className="grid gap-px bg-ink-line lg:grid-cols-2">
        {/* Levo – velika slika */}
        <div className="relative min-h-[75svh] overflow-hidden bg-ink lg:min-h-0">
          <motion.img
            src={bigImg}
            alt="Pečenje – specijalitet restorana Savić"
            loading="lazy"
            style={{ y: bigY }}
            className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <motion.div
            className="absolute inset-x-6 bottom-8 sm:inset-x-10 sm:bottom-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={textStagger}
          >
            <motion.span
              variants={textItem}
              className="inline-block rounded-full border border-gold/40 bg-ink/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md"
            >
              Po čemu nas pamte
            </motion.span>
            <motion.h2
              variants={textItem}
              className="mt-4 bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text pb-2 text-6xl leading-none text-transparent sm:text-7xl lg:text-8xl"
            >
              Pečenje
            </motion.h2>
            <motion.p variants={textItem} className="mt-3 max-w-sm text-white/70">
              Pečeno polako, posluženo sa ljubavlju – kao što se radi već čitav vek.
            </motion.p>
          </motion.div>
        </div>

        {/* Desno – mozaik: slika / tekst, pa obrnuto */}
        <div className="grid gap-px">
          {rows.map((row, i) => (
            <div key={row.title} className="grid gap-px sm:grid-cols-2">
              <div
                className={`group relative min-h-[300px] overflow-hidden bg-ink sm:min-h-[340px] lg:min-h-[360px] ${
                  i % 2 === 1 ? "sm:order-2" : ""
                }`}
              >
                <img
                  src={row.image}
                  alt={row.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/15 transition-colors duration-700 group-hover:bg-transparent" />
              </div>

              <motion.div
                className="flex flex-col justify-center bg-ink-soft p-8 sm:p-10 xl:p-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                variants={textStagger}
              >
                <motion.p variants={textItem} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                  {row.subtitle}
                </motion.p>
                <motion.h3 variants={textItem} className="mt-4 text-3xl leading-tight xl:text-4xl">
                  {row.title}
                </motion.h3>
                <motion.p variants={textItem} className="mt-4 text-sm leading-relaxed text-white/55">
                  {row.text}
                </motion.p>
                <motion.div variants={textItem} className="mt-7">
                  <Link
                    to={row.link.to}
                    className="group/link relative inline-block pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
                  >
                    {row.link.label}
                    <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/40" />
                    <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
