import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import { ease } from "../lib/motion"
import { usePick, useT, type Text } from "../i18n/lang"
import VideoModal from "./VideoModal"
import PreviewVideo from "./PreviewVideo"
import tartarPoster from "../assets/posters/tartar.jpg"
import biftekPoster from "../assets/posters/biftek.jpg"
import paprikePoster from "../assets/posters/paprike.jpg"

type Dish = {
  name: Text
  tags: Text[]
  description?: Text
  // "Kako se pravi" – ako jelo nema korake, ovaj deo se ne prikazuje
  steps?: { title: Text; text: Text }[]
  video: string
  poster: string
  // true = u videu nema pripreme: bez dugmeta "Pogledaj pripremu", video samo bez zvuka (ne otvara se)
  noPreparation?: boolean
}

// TODO: pravi tekstovi – ovo je privremeno
const specialty = { sr: "Specijalitet kuće", en: "House Specialty" }
const premium = { sr: "Premium", en: "Premium" }

const dishes: Dish[] = [
  {
    name: { sr: "Tatar biftek", en: "Steak Tartare" },
    tags: [specialty, premium],
    description: {
      sr: "Najfiniji biftek, sečen isključivo nožem, začinjen po recepturi kuće i poslužen na hrskavom domaćem hlebu.",
      en: "The finest beef tenderloin, cut by hand only, seasoned to our house recipe and served on crisp home-baked bread.",
    },
    steps: [
      {
        title: { sr: "Ručno seckanje", en: "Cut by hand" },
        text: {
          sr: "Biftek sečemo nožem, nikad mašinom, da zadrži strukturu i sočnost.",
          en: "We cut the tenderloin with a knife, never a machine, so it keeps its texture and juiciness.",
        },
      },
      {
        title: { sr: "Začini kuće", en: "House seasoning" },
        text: { sr: "Mešamo po recepturi koju čuvamo godinama.", en: "Blended to a recipe we have treasured for years." },
      },
      {
        title: { sr: "Serviranje", en: "To serve" },
        text: { sr: "Na toplom, hrskavom hlebu, uz sveže začinsko bilje.", en: "On warm, crisp bread with fresh herbs." },
      },
    ],
    video: "/video/videoSavicTartar.mp4",
    poster: tartarPoster,
  },
  {
    name: { sr: "Biftek na žaru", en: "Grilled Beef Tenderloin" },
    tags: [{ sr: "Sa žara", en: "From the Grill" }, premium],
    description: {
      sr: "Sočan medaljon bifteka pečen na jakoj vatri, preliven konjakom",
      en: "A juicy tenderloin medallion, seared over a high flame and finished with cognac",
    },
    steps: [
      {
        title: { sr: "Žar", en: "The sear" },
        text: { sr: "Pečemo na jakoj vatri da se sokovi zatvore unutra.", en: "Seared over a high flame to lock in all the juices." },
      },
      {
        title: { sr: "Maslac i beli luk", en: "Butter & garlic" },
        text: {
          sr: "Prelivamo penušavim maslacem sa belim lukom i začinskim biljem.",
          en: "Basted with foaming butter, garlic and fresh herbs.",
        },
      },
      {
        title: { sr: "Prilog", en: "On the side" },
        text: { sr: "Služimo uz pečeni krompir i hrskave kolutiće luka.", en: "Served with roast potatoes and crispy onion rings." },
      },
    ],
    video: "/video/videoSavic.mp4",
    poster: biftekPoster,
  },
  {
    name: { sr: "Pohovane punjene paprike", en: "Breaded Stuffed Peppers" },
    tags: [{ sr: "Domaća kuhinja", en: "Home-Style Cooking" }, specialty],
    description: {
      sr: "Punimo ih i pohujemo po recepturi koju čuvamo godinama.",
      en: "Stuffed and breaded to a recipe we have treasured for years.",
    },
    steps: [
      {
        title: { sr: "Punjenje", en: "The filling" },
        text: {
          sr: "Paprike punimo dimljenom cepkanom butkicom, feta sirom i sitno seckanim belim lukom.",
          en: "We fill the peppers with shredded smoked ham, feta cheese and finely chopped garlic.",
        },
      },
      {
        title: { sr: "Pohovanje", en: "The coating" },
        text: {
          sr: "Pohujemo ih u prezlama, brašnu i jajima, dok ne postanu savršeno hrskave.",
          en: "Coated in flour, egg and breadcrumbs, then fried until perfectly crisp.",
        },
      },
      {
        title: { sr: "Serviranje", en: "To serve" },
        text: {
          sr: "Služimo ih kao toplo predjelo, uz domaći tartar sos i kriške limuna.",
          en: "Served as a warm starter with house-made tartar sauce and lemon wedges.",
        },
      },
    ],
    video: "/video/paprike.mp4",
    poster: paprikePoster,
    noPreparation: true,
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

const cardClass =
  "group relative block aspect-[9/16] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)]"

function VideoCard({
  interactive,
  onOpen,
  label,
  children,
}: {
  interactive: boolean
  onOpen: () => void
  label: string
  children: React.ReactNode
}) {
  return interactive ? (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={`${cardClass} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
    >
      {children}
    </button>
  ) : (
    <div className={cardClass}>{children}</div>
  )
}

function DishRow({ dish, index }: { dish: Dish; index: number }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const rowRef = useRef<HTMLDivElement>(null)
  const t = useT()
  const pick = usePick()
  const name = pick(dish.name)
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
                key={tag.sr}
                className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"
              >
                {pick(tag)}
              </span>
            ))}
          </motion.div>

          <motion.h3 variants={textItem} className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {name}
          </motion.h3>

          {dish.description && (
            <motion.p variants={textItem} className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
              {pick(dish.description)}
            </motion.p>
          )}

          {dish.steps && (
            <motion.p
              variants={textItem}
              className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold"
            >
              {t("Kako se pravi", "How it's made")}
            </motion.p>
          )}

          {dish.steps && (
            <ol className="mt-5 space-y-6">
              {dish.steps.map((step, i) => (
                <motion.li key={step.title.sr} variants={textItem} className="relative flex gap-5">
                  {i < dish.steps!.length - 1 && (
                    <span aria-hidden className="absolute left-4 top-10 -bottom-4 w-px bg-gradient-to-b from-gold/40 to-transparent" />
                  )}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-xs font-semibold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-white">{pick(step.title)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{pick(step.text)}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          )}

          <motion.div variants={textItem} className="mt-10 flex flex-wrap items-center gap-6">
            {!dish.noPreparation && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn-flow group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                {t("Pogledaj pripremu", "Watch it being made")}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                </span>
              </button>
            )}
            <Link
              to="/meni"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold"
            >
              {t("Pogledaj meni", "View the menu")}
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

          {/* Kartica: klik otvara video sa zvukom – osim kad u videu nema pripreme */}
          <VideoCard
            interactive={!dish.noPreparation}
            onOpen={() => setOpen(true)}
            label={`${t("Pogledaj pripremu", "Watch it being made")} – ${name}`}
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
                {!dish.noPreparation && <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("Priprema", "In the kitchen")}</p>}
                <p className="font-serif text-lg text-white">{name}</p>
              </div>
              {!dish.noPreparation && (
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2s]" />
                  <Play className="relative ml-0.5 h-4 w-4 fill-current" />
                </span>
              )}
            </div>
          </VideoCard>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && <VideoModal src={dish.video} poster={dish.poster} label={`${t("Priprema", "Preparation")} – ${name}`} onClose={close} />}
      </AnimatePresence>
    </div>
  )
}

export default function Specialties() {
  const t = useT()
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
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Iz naše kuhinje", "From our kitchen")}</span>
            <span className="streak-x" />
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            {t("Naši", "Our")}{" "}
            <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">
              {t("specijaliteti", "specialties")}
            </span>
          </h2>
          <p className="mt-5 text-white/55">{t("Pogledajte kako nastaju jela po kojima nas gosti pamte.", "Watch the dishes our guests remember us for come to life.")}</p>
        </motion.div>

        <div className="mt-32 space-y-40 sm:mt-40 sm:space-y-52">
          {dishes.map((dish, i) => (
            <DishRow key={dish.name.sr} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
