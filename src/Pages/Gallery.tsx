import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import SkewedCarousel from "../components/SkewedCarousel"
import ReservationOptions from "../components/ReservationOptions"
import { ease } from "../lib/motion"
import headerImg from "../assets/galerija/ambijent/ambijent-02.jpg"

const glob = (files: Record<string, string>) =>
  Object.keys(files)
    .sort()
    .map((key) => files[key])

const dishImages = glob(import.meta.glob<string>("../assets/galerija/jela/*.jpg", { eager: true, import: "default" }))
const ambienceImages = glob(
  import.meta.glob<string>("../assets/galerija/ambijent/*.jpg", { eager: true, import: "default" }),
)

// TODO: korigovati nazive jela – redosled prati slike jelo-01 … jelo-10
const dishTitles = [
  "Kroketi sa sosom",
  "Punjeni kroketi",
  "Mešano meso sa roštilja",
  "Domaće pečenje",
  "Pljeskavica sa krompirom",
  "Karađorđeva šnicla",
  "Roštilj plato",
  "Pita sa makom",
  "Domaća štrudla",
  "Domaća rakija",
]

const dishes = dishImages.map((src, i) => ({ src, title: dishTitles[i] ?? "Specijalitet kuće" }))

// Širina kartice u karuselu zavisi od ekrana
function useCardWidth() {
  const get = () => (window.innerWidth < 640 ? 220 : window.innerWidth < 1024 ? 280 : 340)
  const [width, setWidth] = useState(get)
  useEffect(() => {
    const onResize = () => setWidth(get())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return width
}

/* Pregled slike preko celog ekrana, sa listanjem */
function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const lenis = useLenis()

  useEffect(() => {
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onStep(-1)
      if (e.key === "ArrowRight") onStep(1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", onKey)
    }
  }, [lenis, onClose, onStep])

  const nav =
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/50 text-white backdrop-blur-md transition-colors hover:border-gold hover:text-gold"

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pregled slike"
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zatvori"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="Prethodna"
        className={`${nav} left-3 sm:left-8`}
        onClick={(e) => {
          e.stopPropagation()
          onStep(-1)
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Sledeća"
        className={`${nav} right-3 sm:right-8`}
        onClick={(e) => {
          e.stopPropagation()
          onStep(1)
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={ambienceImages[index]}
          alt="Ambijent restorana Savić"
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85svh] max-w-full rounded-2xl border border-gold/20 object-contain shadow-[0_0_80px_rgba(238,191,28,0.12)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease }}
        />
      </AnimatePresence>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-white/50">
        {index + 1} / {ambienceImages.length}
      </p>
    </motion.div>,
    document.body,
  )
}

export default function Gallery() {
  const cardWidth = useCardWidth()
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + ambienceImages.length) % ambienceImages.length)),
    [],
  )

  return (
    <>
      <PageHeader eyebrow="Iz naše kuhinje i sale" title="Galerija" image={headerImg} />

      {/* Jela – iskošeni 3D karusel */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_55%,rgba(238,191,28,0.08),transparent)]" />
        <Reveal className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="streak-x hidden sm:block" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Iz naše kuhinje</span>
            <span className="streak-x hidden sm:block" />
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl">
            Naša{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">jela</span>
          </h2>
          <p className="mt-5 text-white/55">Prevucite, kliknite na sliku ili koristite strelice.</p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16">
          <SkewedCarousel
            items={dishes}
            initialIndex={3}
            cardWidth={cardWidth}
            aspectRatio="3 / 4"
            rotation={30}
            inactiveScale={0.82}
            perspective={1000}
            borderRadius={24}
            loop
          />
        </Reveal>
      </section>

      {/* Ambijent – zid slika, klik otvara pregled */}
      <section className="relative border-t border-ink-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="streak-x hidden sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Ambijent</span>
              <span className="streak-x hidden sm:block" />
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              Naša{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">sala</span>
            </h2>
          </Reveal>

          <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3">
            {ambienceImages.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.08} className="mb-3 break-inside-avoid sm:mb-5">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Otvori sliku ${i + 1}`}
                  className={`group relative block w-full overflow-hidden rounded-[1.25rem] border border-white/10 transition-colors duration-500 hover:border-gold/40 ${
                    i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={src}
                    alt="Ambijent restorana Savić"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/40" />
                  <span className="absolute right-3 top-3 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReservationOptions />

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </>
  )
}
