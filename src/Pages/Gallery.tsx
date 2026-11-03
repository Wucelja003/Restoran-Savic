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
import { useLang, useT } from "../i18n/lang"
import headerImg from "../assets/galerija/ambijent/ambijent-02.jpg"
import jelo04 from "../assets/galerija/jela/jelo-04.jpg"
import jelo05 from "../assets/galerija/jela/jelo-05.jpg"
import jelo06 from "../assets/galerija/jela/jelo-06.jpg"
import jelo08 from "../assets/galerija/jela/jelo-08.jpg"
import jelo09 from "../assets/galerija/jela/jelo-09.jpg"
import jelo10 from "../assets/galerija/jela/jelo-10.jpg"
import jelo11 from "../assets/galerija/jela/jelo-11.jpg"
// Ista jela i slike kao u sekciji "Šta još izdvajamo" na početnoj
import cevapi from "../assets/images/cevapi.jpg"
import lignje from "../assets/images/lignje-2.jpg"
import losos from "../assets/images/losos-3.jpg"
import pecurke from "../assets/images/pecurke-2.jpg"

const glob = (files: Record<string, string>) =>
  Object.keys(files)
    .sort()
    .map((key) => files[key])

const ambienceImages = glob(
  import.meta.glob<string>("../assets/galerija/ambijent/*.jpg", { eager: true, import: "default" }),
)

// Jela u karuselu – svaka slika ide zajedno sa svojim nazivom, pa promena naziva ne pomera slike.
// Da dodaš jelo: ubaci sliku u src/assets/galerija/jela/, uvezi je gore i dodaj red ovde.
const dishes = [
  { src: jelo04, title: { sr: "Domaće pečenje", en: "Traditional Roast" } },
  { src: jelo05, title: { sr: "Gurmanska pljeskavica", en: "Gourmet Pljeskavica – stuffed Serbian patty" } },
  { src: jelo06, title: { sr: "Karađorđeva šnicla", en: "Karađorđe Schnitzel" } },
  { src: cevapi, title: { sr: "Ćevapi zapečeni u sosu od ajvara", en: "Ćevapi Baked in Ajvar Sauce" } },
  { src: lignje, title: { sr: "Lignje", en: "Squid" } },
  { src: losos, title: { sr: "Losos", en: "Salmon" } },
  { src: pecurke, title: { sr: "Pečurke na žaru", en: "Grilled Mushrooms" } },
  { src: jelo08, title: { sr: "Pita sa suvim šljivama", en: "Prune Pie" } },
  { src: jelo09, title: { sr: "Pita sa jabukama", en: "Apple Pie" } },
  { src: jelo11, title: { sr: "Palačinke u vinskom šatou", en: "Crêpes in Wine Chaudeau" } },
  { src: jelo10, title: { sr: "Domaća rakija", en: "Homemade Rakija" } },
]

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
  const t = useT()

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
      aria-label={t("Pregled slike", "Image viewer")}
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("Zatvori", "Close")}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label={t("Prethodna", "Previous")}
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
        aria-label={t("Sledeća", "Next")}
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
          alt={t("Ambijent restorana Savić", "Inside Restaurant Savić")}
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
  const t = useT()
  const { lang } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + ambienceImages.length) % ambienceImages.length)),
    [],
  )

  return (
    <>
      <PageHeader eyebrow={t("Iz naše kuhinje i sale", "From our kitchen and dining room")} title={t("Galerija", "Gallery")} image={headerImg} />

      {/* Jela – iskošeni 3D karusel */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_55%,rgba(238,191,28,0.08),transparent)]" />
        <Reveal className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="streak-x hidden sm:block" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Iz naše kuhinje", "From our kitchen")}</span>
            <span className="streak-x hidden sm:block" />
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl">
            {t("Naša", "Our")}{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">{t("jela", "dishes")}</span>
          </h2>
          <p className="mt-5 text-white/55">{t("Prevucite, kliknite na sliku ili koristite strelice.", "Swipe, tap an image or use the arrows.")}</p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16">
          <SkewedCarousel
            items={dishes.map((d) => ({ src: d.src, title: d.title[lang] }))}
            initialIndex={1}
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
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Ambijent", "Ambience")}</span>
              <span className="streak-x hidden sm:block" />
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              {t("Naša", "Our")}{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">{t("sala", "dining room")}</span>
            </h2>
          </Reveal>

          <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3">
            {ambienceImages.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.08} className="mb-3 break-inside-avoid sm:mb-5">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${t("Otvori sliku", "Open image")} ${i + 1}`}
                  className={`group relative block w-full overflow-hidden rounded-[1.25rem] border border-white/10 transition-colors duration-500 hover:border-gold/40 ${
                    i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={src}
                    alt={t("Ambijent restorana Savić", "Inside Restaurant Savić")}
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
