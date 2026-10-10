import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useInView } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { PaperSheet, WrittenTitle } from "../components/Vintage"
import PreviewVideo from "../components/PreviewVideo"
import VideoModal from "../components/VideoModal"
import { ease } from "../lib/motion"
import headerImg from "../assets/images/restoran.jpg"
import fatherImg from "../assets/images/otac.jpg"
import logo from "../assets/logo.png"
import storyPoster1 from "../assets/posters/prica-1.jpg"
import storyPoster2 from "../assets/posters/prica-2.jpg"
import storyPoster3 from "../assets/posters/prica-3.jpg"

// TODO: prava priča – tekst je privremen
const letter = {
  greeting: "Dragi gosti,",
  paragraphs: [
    "Pre više od sto godina naša porodica otvorila je vrata svoje kuće gostima. Od tada se mnogo toga promenilo – grad, ulice, ljudi – ali ono najvažnije ostalo je isto: topla reč, pun sto i hrana spremljena kao nekada.",
    "Recepti su se prenosili s kolena na koleno, zapisivani rukom i čuvani kao najveće blago. Svaka generacija dodala je ponešto svoje, ali nijedna nije zaboravila odakle smo krenuli.",
    "Danas, kada sednete za naš sto, niste samo gost restorana – postajete deo priče koja traje čitav vek.",
  ],
  closing: "S poštovanjem,",
}

// TODO: proveriti tekstove vrednosti
const values = [
  { title: "Recepti", text: "Zapisani rukom, čuvani generacijama i spremani bez prečica." },
  { title: "Domaćinstvo", text: "Svaki gost je dočekan kao član porodice – toplo i od srca." },
  { title: "Pečenje", text: "Domaći jaganjci iz peštera i praseće pečenje, na tihoj vatri, baš kao nekada." },
]

// Potpis se ispiše kad se završi naslov "Naša priča", pa zatim pečat
const SIGNATURE_DELAY = 1.4 // s

function Letter() {
  const ref = useRef<HTMLDivElement>(null)
  const started = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })

  return (
    <PaperSheet className="relative z-10 -rotate-1 px-7 pb-14 pt-24 sm:px-14 sm:pb-16 sm:pt-28 lg:pr-32 lg:pt-16">
      <div ref={ref} className="paper-text">
        {/* Pečat */}
        <motion.img
          src={logo}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-5 w-20 mix-blend-multiply [filter:sepia(1)_saturate(3)_hue-rotate(-30deg)_brightness(0.5)] sm:w-24 lg:bottom-auto lg:right-8 lg:top-8 lg:w-28"
          initial={{ opacity: 0, scale: 1.8, rotate: -30 }}
          animate={started ? { opacity: 0.75, scale: 1, rotate: -14 } : undefined}
          transition={{ delay: SIGNATURE_DELAY + 2.4, type: "spring", stiffness: 260, damping: 16 }}
        />

        <WrittenTitle show={started} className="-ml-3 font-script text-5xl text-[#5b3a1a] sm:text-6xl">
          Naša priča
        </WrittenTitle>

        <div className="mt-6 space-y-5 font-old text-lg leading-relaxed sm:text-xl">
          <p className="italic">{letter.greeting}</p>
          {letter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="pt-4 italic">{letter.closing}</p>
        </div>

        {/* Potpis */}
        <div className="relative mt-1 inline-block">
          <WrittenTitle
            as="p"
            show={started}
            delay={SIGNATURE_DELAY}
            duration={1.8}
            className="-ml-3 font-script text-4xl text-[#5b3a1a] sm:text-5xl"
          >
            Porodica Savić
          </WrittenTitle>
          <svg viewBox="0 0 240 20" className="absolute -bottom-2 left-0 w-56 text-[#5b3a1a]" aria-hidden>
            <motion.path
              d="M4 12 C 60 2, 120 18, 180 8 S 230 6, 236 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={started ? { pathLength: 1 } : undefined}
              transition={{ delay: SIGNATURE_DELAY + 1.6, duration: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </PaperSheet>
  )
}

function FatherPhoto() {
  return (
    <motion.figure
      className="vintage-photo relative mx-auto w-[260px] sm:w-[320px] lg:mx-0"
      initial={{ opacity: 0, y: 60, rotate: 12 }}
      whileInView={{ opacity: 1, y: 0, rotate: 4 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      <span className="tape -left-8 top-3 -rotate-[35deg]" />
      <span className="tape -right-8 top-3 rotate-[35deg]" />

      <div className="relative overflow-hidden">
        <img src={fatherImg} alt="Otac našeg vlasnika" className="aspect-[7/9] w-full object-cover" />
        <span className="photo-vignette" />
      </div>

      {/* TODO: ime i godine */}
      <figcaption className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-[#3a2717]">
        Otac našeg vlasnika
      </figcaption>
    </motion.figure>
  )
}

function ValueNote({ title, text, index }: { title: string; text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const started = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const tilt = ["-rotate-2", "rotate-1", "-rotate-1"][index % 3]

  return (
    <Reveal delay={index * 0.15}>
      <div className={`transition-transform duration-500 will-change-transform hover:-translate-y-2 hover:rotate-0 ${tilt}`}>
        <PaperSheet className="px-7 pb-9 pt-10">
          {/* Čioda */}
          <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-gold shadow-[0_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.3)]" />
          <div ref={ref} className="paper-text">
            <WrittenTitle as="h3" show={started} duration={1} className="-ml-3 font-script text-4xl text-[#5b3a1a]">
              {title}
            </WrittenTitle>
            <p className="mt-2 font-hand text-2xl leading-snug">{text}</p>
          </div>
        </PaperSheet>
      </div>
    </Reveal>
  )
}

// Videi za "Priča o Restoranu Savić" (public/video/, redom IMG_9332, IMG_9333, IMG_9334).
// Poster je prvi kadar videa – prikazuje se dok se video ne učita.
const storyVideos = [
  { src: "/video/prica-1.mp4", poster: storyPoster1 },
  { src: "/video/prica-2.mp4", poster: storyPoster2 },
  { src: "/video/prica-3.mp4", poster: storyPoster3 },
]

function StoryVideo({ src, poster, index }: { src: string; poster: string; index: number }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const tilt = ["-rotate-2", "rotate-1", "-rotate-1"][index % 3]

  return (
    <Reveal delay={index * 0.15}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Pogledaj video ${index + 1}`}
        className={`vintage-photo group relative mx-auto block w-full max-w-[320px] transition-transform duration-500 will-change-transform hover:-translate-y-2 hover:rotate-0 ${tilt}`}
      >
        <div className="relative aspect-[9/16] overflow-hidden">
          <PreviewVideo
            src={src}
            poster={poster}
            paused={open}
            className="h-full w-full object-cover [filter:sepia(0.35)] transition-[filter] duration-700 group-hover:[filter:none]"
          />
          <span className="photo-vignette" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/50 text-gold backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
              <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2.5s]" />
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>
          </span>
        </div>
        <span className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-[#3a2717]">0{index + 1}</span>
      </button>

      <AnimatePresence>
        {open && <VideoModal src={src} poster={poster} label="Priča o Restoranu Savić" onClose={close} />}
      </AnimatePresence>
    </Reveal>
  )
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Vek tradicije" title="O nama" image={headerImg} imageClassName="sepia-[0.6]" />

      {/* Pismo i fotografija */}
      <section className="relative overflow-x-clip py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_35%,rgba(238,191,28,0.08),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="streak-x hidden sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Iz porodične arhive</span>
              <span className="streak-x hidden sm:block" />
            </div>
          </Reveal>
          <div className="mt-4 text-center">
            <WrittenTitle className="font-script text-6xl text-gold sm:text-7xl lg:text-8xl" duration={2}>
              Sto godina za istim stolom
            </WrittenTitle>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl items-start lg:mt-24 lg:grid-cols-[1.5fr_1fr]">
            <div className="order-2 -mt-16 lg:order-1 lg:mt-0">
              <Letter />
            </div>
            <div className="relative z-20 order-1 lg:order-2 lg:-ml-8 lg:mt-28">
              <FatherPhoto />
            </div>
          </div>
        </div>
      </section>

      {/* Vrednosti */}
      <section className="relative overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4">
                <span className="streak-x hidden sm:block" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Ono što čuvamo</span>
                <span className="streak-x hidden sm:block" />
              </div>
            </Reveal>
            <WrittenTitle className="mt-4 font-script text-5xl text-gold sm:text-6xl">Naše vrednosti</WrittenTitle>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {values.map((v, i) => (
              <ValueNote key={v.title} title={v.title} text={v.text} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Priča o Restoranu Savić – tri videa */}
      <section className="relative overflow-x-clip border-t border-ink-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <WrittenTitle className="font-script text-5xl text-gold sm:text-6xl lg:text-7xl" duration={1.8}>
              Priča o Restoranu Savić
            </WrittenTitle>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {storyVideos.map((v, i) => (
              <StoryVideo key={v.src} src={v.src} poster={v.poster} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Završnica */}
      <section className="relative overflow-x-clip border-t border-ink-line py-28 text-center sm:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,rgba(238,191,28,0.08),transparent)]" />
        <div className="relative px-4">
          <WrittenTitle className="font-script text-6xl text-gold sm:text-8xl" duration={2.2}>
            Dobro došli u našu kuću
          </WrittenTitle>
          <Reveal delay={0.6}>
            <p className="mx-auto mt-6 max-w-md font-old text-xl italic text-white/60">
              Za istim stolom, uz iste recepte – kao nekada.
            </p>
            <Link
              to="/rezervacija"
              className="btn-flow group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em]"
            >
              Rezerviši sto
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
