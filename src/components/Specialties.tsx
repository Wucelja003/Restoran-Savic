import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import { ease } from "../lib/motion"
import VideoModal from "./VideoModal"
import PreviewVideo from "./PreviewVideo"
import tartarPoster from "../assets/posters/tartar.jpg"
import biftekPoster from "../assets/posters/biftek.jpg"

type Dish = {
  name: string
  tags: string[]
  description: string
  steps: { title: string; text: string }[]
  video: string
  poster: string
}

// TODO: pravi tekstovi – ovo je privremeno
const dishes: Dish[] = [
  {
    name: "Tartar biftek",
    tags: ["Specijalitet kuće", "Premium"],
    description:
      "Najfiniji biftek, sečen isključivo nožem, začinjen po recepturi kuće i poslužen na hrskavom domaćem hlebu.",
    steps: [
      { title: "Ručno seckanje", text: "Biftek sečemo nožem, nikad mašinom, da zadrži strukturu i sočnost." },
      { title: "Začini kuće", text: "Kapar, kiseli krastavčići, luk i senf – mešamo po recepturi koju čuvamo godinama." },
      { title: "Serviranje", text: "Na toplom, hrskavom hlebu, uz sveže začinsko bilje." },
    ],
    video: "/videoSavicTartar.mp4",
    poster: tartarPoster,
  },
  {
    name: "Biftek na žaru",
    tags: ["Sa žara", "Premium"],
    description: "Sočan medaljon bifteka pečen na jakoj vatri, preliven penušavim maslacem sa belim lukom.",
    steps: [
      { title: "Žar", text: "Pečemo na jakoj vatri da se sokovi zatvore unutra." },
      { title: "Maslac i beli luk", text: "Prelivamo penušavim maslacem sa belim lukom i začinskim biljem." },
      { title: "Prilog", text: "Služimo uz pečeni krompir i hrskave kolutiće luka." },
    ],
    video: "/videoSavic.mp4",
    poster: biftekPoster,
  },
]

const textStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const textItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

function DishRow({ dish, index }: { dish: Dish; index: number }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const rowRef = useRef<HTMLDivElement>(null)
  const reversed = index % 2 === 1

  // Blagi parallax: video i veliki broj se pomeraju različitom brzinom pri skrolu
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] })
  const videoY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const numberY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const number = String(index + 1).padStart(2, "0")

  return (
    <div ref={rowRef} className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      {/* Tekst */}
      <motion.div
        className={`relative ${reversed ? "lg:order-2" : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={textStagger}
      >
        <motion.span
          aria-hidden
          style={{ y: numberY }}
          className="pointer-events-none absolute -top-20 font-serif text-[9rem] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgba(238,191,28,0.25)] sm:-top-28 sm:text-[12rem] lg:-left-6"
        >
          {number}
        </motion.span>

        <div className="relative">
          <motion.div variants={textItem} className="flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h3 variants={textItem} className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {dish.name}
          </motion.h3>

          <motion.p variants={textItem} className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
            {dish.description}
          </motion.p>

          <motion.p
            variants={textItem}
            className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold"
          >
            Kako se pravi
          </motion.p>

          <ol className="mt-5 space-y-6">
            {dish.steps.map((step, i) => (
              <motion.li key={step.title} variants={textItem} className="relative flex gap-5">
                {i < dish.steps.length - 1 && (
                  <span aria-hidden className="absolute left-4 top-10 -bottom-4 w-px bg-gradient-to-b from-gold/40 to-transparent" />
                )}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-xs font-semibold text-gold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div variants={textItem} className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-flow group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Pogledaj pripremu
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
            </button>
            <Link
              to="/meni"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold"
            >
              Pogledaj meni
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Video */}
      <motion.div
        className={`relative mx-auto w-full max-w-[340px] lg:max-w-[380px] ${reversed ? "lg:order-1" : ""}`}
        initial={{ opacity: 0, x: reversed ? -60 : 60, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease }}
      >
        <motion.div style={{ y: videoY }} className="relative">
          {/* Zlatni sjaj i okvir u pozadini */}
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(55%_55%_at_50%_45%,rgba(238,191,28,0.18),transparent_70%)]" />
          <div
            aria-hidden
            className={`absolute inset-0 -z-10 rounded-[2rem] border border-gold/30 ${
              reversed ? "-translate-x-5 translate-y-5" : "translate-x-5 translate-y-5"
            }`}
          />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Pogledaj pripremu – ${dish.name}`}
            className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <PreviewVideo
              src={dish.video}
              poster={dish.poster}
              paused={open}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />

            <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 font-serif text-sm text-gold backdrop-blur-md">
              {number}
            </span>

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/40 p-3 pl-4 backdrop-blur-md transition-colors duration-300 group-hover:border-gold/40">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Priprema</p>
                <p className="font-serif text-lg text-white">{dish.name}</p>
              </div>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:scale-110">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2s]" />
                <Play className="relative ml-0.5 h-4 w-4 fill-current" />
              </span>
            </div>
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && <VideoModal src={dish.video} poster={dish.poster} label={`Priprema – ${dish.name}`} onClose={close} />}
      </AnimatePresence>
    </div>
  )
}

export default function Specialties() {
  return (
    <section className="relative overflow-x-clip border-t border-ink-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center justify-center gap-4">
            <span className="streak-x" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Iz naše kuhinje</span>
            <span className="streak-x" />
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Naši{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
              specijaliteti
            </span>
          </h2>
          <p className="mt-5 text-white/55">Pogledajte kako nastaju jela po kojima nas gosti pamte.</p>
        </motion.div>

        <div className="mt-32 space-y-40 sm:mt-40 sm:space-y-52">
          {dishes.map((dish, i) => (
            <DishRow key={dish.name} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
