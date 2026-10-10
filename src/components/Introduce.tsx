import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import VideoModal from "./VideoModal"
import PreviewVideo from "./PreviewVideo"
import { ease } from "../lib/motion"
import logo from "../assets/logo.png"
import videoPoster from "../assets/posters/introduce.jpg"

const VIDEO_SRC = "/video/videoSavicIntroduce.mp4"

function VideoShowcase() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]">
      {/* Zlatni sjaj iza videa */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(238,191,28,0.16),transparent_70%)]" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Pogledaj video"
        className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(238,191,28,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <PreviewVideo
          src={VIDEO_SRC}
          poster={videoPoster}
          paused={open}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">Restoran Savić</span>
        </div>

        {/* Dugme za puštanje */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors duration-300 group-hover:bg-ink/30">
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/50 text-gold backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
            <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2s]" />
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-ink/70 to-transparent pb-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85">Pogledaj video</span>
        </div>
      </button>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/40">Atmosfera našeg restorana</p>

      <AnimatePresence>{open && <VideoModal src={VIDEO_SRC} poster={videoPoster} label="Video – Restoran Savić" onClose={close} />}</AnimatePresence>
    </div>
  )
}

export default function Introduce() {
  return (
    <section className="relative overflow-x-clip py-20 sm:py-28">
      {/* Logo i kicker */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-4 px-4 text-center sm:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="h-20 w-auto [filter:drop-shadow(0_0_18px_rgba(238,191,28,0.35))]"
        />
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">100 godina tradicije</span>
      </motion.div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Levo – tekst */}
        <motion.div
          initial={{ opacity: 0, x: -44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex items-center gap-4">
            <span className="streak-x" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Porodična tradicija</span>
          </div>

          <h2 className="mt-7 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Ukus koji se prenosi{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text pb-[0.1em] text-transparent">
              s kolena na koleno
            </span>
            <span className="text-gold">.</span>
          </h2>

          {/* TODO: prava priča o restoranu */}
          <div className="mt-9 flex gap-6">
            <span className="streak-y" />
            <div className="max-w-xl space-y-5">
              <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
                <span className="text-white">Već čitav vek okupljamo porodice i prijatelji.</span>
              </p>
              <p className="leading-relaxed text-white/55">
                Spremamo jela od svežih, domaćih namirnica, po receptima koje čuvamo generacijama. Bilo da dolazite na
                ručak, večeru ili proslavu – potrudićemo se da se osećate kao kod kuće.
              </p>
            </div>
          </div>

          <Link
            to="/o-nama"
            className="btn-flow group relative mt-11 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em]"
          >
            Više o nama
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Desno – video */}
        <motion.div
          initial={{ opacity: 0, x: 44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
        >
          <VideoShowcase />
        </motion.div>
      </div>
    </section>
  )
}
