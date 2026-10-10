import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "motion/react"
import { Play } from "lucide-react"
import { ease } from "../lib/motion"
import PreviewVideo from "./PreviewVideo"
import VideoModal from "./VideoModal"
import bigImg from "../assets/pecenje/pecenje-veliko.jpg"
import pecenjeImg from "../assets/pecenje/pecenje.jpg"
import pecenjePoster from "../assets/posters/pecenje.jpg"
import stoImg from "../assets/pecenje/sto.jpg"

const PECENJE_VIDEO = "/video/pecenje.mp4"

type Row = {
  image: string
  alt: string
  subtitle: string
  title: string
  text: string
  link?: { to: string; label: string }
  // ako postoji, umesto slike ide video u prirodnoj veličini (9:16), klik pušta sa zvukom
  video?: string
}

// TODO: proveriti tekstove sa vlasnikom
const rows: Row[] = [
  {
    image: pecenjeImg,
    alt: "Pečenje na tacni",
    subtitle: "Ponos naše kuće",
    title: "Pečenje kao nekada",
    text: "Pečeno polako, satima, dok korica ne postane zlatna i hrskava, a meso toliko mekano da se topi. Recept po kome nas gosti pamte generacijama.",
    link: { to: "/meni#glavna-jela", label: "Glavna jela" },
  },
  {
    image: pecenjePoster,
    alt: "Pečenje na ražnju",
    subtitle: "Sa ražnja",
    title: "Pečenje na ražnju",
    text: "Nad žarom, polako i sa strpljenjem koje se ne može ubrzati – pogledajte kako nastaje naše pečenje.",
    video: PECENJE_VIDEO,
  },
  {
    image: stoImg,
    alt: "Postavljen sto u restoranu",
    subtitle: "Za veće društvo",
    title: "Slavlja i proslave",
    text: "Porodična okupljanja, slave i proslave – spremamo pečenje i punu trpezu za vaše društvo, po vašoj meri.",
    link: { to: "/rezervacija#proslave", label: "Rezerviši salu" },
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
  const [videoOpen, setVideoOpen] = useState(false)
  const closeVideo = useCallback(() => setVideoOpen(false), [])

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
              {row.video ? (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Pogledaj video – ${row.title}`}
                  className={`group relative aspect-[9/16] w-full cursor-pointer overflow-hidden bg-ink ${i % 2 === 1 ? "sm:order-2" : ""}`}
                >
                  <PreviewVideo
                    src={row.video}
                    poster={row.image}
                    paused={videoOpen}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/30" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/50 text-gold backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                      <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2.5s]" />
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  </span>
                </button>
              ) : (
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
              )}

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
                  {row.link ? (
                    <Link
                      to={row.link.to}
                      className="group/link relative inline-block pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
                    >
                      {row.link.label}
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/40" />
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVideoOpen(true)}
                      className="group/link relative inline-flex items-center gap-2 pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Pogledaj video
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/40" />
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                    </button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && <VideoModal src={PECENJE_VIDEO} poster={pecenjePoster} label="Pečenje na ražnju" onClose={closeVideo} />}
      </AnimatePresence>
    </section>
  )
}
