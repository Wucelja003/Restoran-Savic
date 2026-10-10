import { motion, type Variants } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"
import Introduce from "../components/Introduce"
import Specialties from "../components/Specialties"
import Highlights from "../components/Highlights"
import MenuCategories from "../components/MenuCategories"
import Showcase from "../components/Showcase"
import Ambience from "../components/Ambience"
import ReservationOptions from "../components/ReservationOptions"
import Location from "../components/Location"
import { ease, useEnterDelay } from "../lib/motion"
import { contact, phoneHref } from "../lib/contact"
import heroImg from "../assets/images/restoran-4.jpg"

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
}

export default function Home() {
  const enterDelay = useEnterDelay()
  const heroStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: enterDelay } },
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        {/* Spolja: ulazna animacija. Unutra: beskonačno sporo približavanje (index.css → hero-zoom) */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, delay: enterDelay - 0.3, ease }}
        >
          <img
            src={heroImg}
            alt="Sala restorana Savić"
            className="h-full w-full animate-hero-zoom object-cover motion-reduce:animate-none"
          />
        </motion.div>
        {/* Preliv: tamnije u sredini iza teksta i dole, da se stopi sa sledećom sekcijom */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(0,0,0,0.55),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

        <motion.div
          className="relative px-4 pb-16 pt-28 text-center"
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-ink/40 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">100 godina tradicije</span>
          </motion.div>

          <motion.h1 variants={heroItem} className="mt-8 leading-none">
            <span className="block font-serif text-3xl font-normal tracking-[0.2em] text-white/90 uppercase sm:text-4xl">
              Restoran
            </span>
            <span className="mt-2 block bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text pb-3 text-7xl text-transparent sm:text-8xl lg:text-9xl">
              Savić
            </span>
          </motion.h1>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease } } }}
            className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          />

          {/* TODO: proveriti tekst sa vlasnikom */}
          <motion.p variants={heroItem} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Pečenje i jela iz domaće kuhinje, pripremljena po porodičnim receptima - posluženi s pažnjom, u toplini koju pamtite.
          </motion.p>

          <motion.div variants={heroItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/rezervacija"
              className="btn-flow group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Rezerviši sto
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/meni"
              className="inline-flex items-center rounded-full border border-white/25 bg-ink/30 px-8 py-[1.05rem] text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Pogledaj meni
            </Link>
          </motion.div>

          {/* Poziv telefonom */}
          <motion.div variants={heroItem} className="mt-8">
            <a href={phoneHref} className="group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 transition-colors duration-300 hover:bg-white/5">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2.5s]" />
                <Phone className="h-4 w-4" />
              </span>
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-white/50">Pozovite nas</span>
                <span className="block font-serif text-xl text-white transition-colors group-hover:text-gold">{contact.phone}</span>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Dno: adresa, poziv na skrol, radno vreme */}
        <motion.div
          className="absolute inset-x-0 bottom-0 hidden items-end justify-between px-10 pb-8 text-xs text-white/55 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: enterDelay + 1 }}
        >
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            {contact.street}, {contact.city}
          </p>
          {/* Samo na visokim ekranima – na nižim bi se preklopilo sa dugmetom za poziv */}
          <span className="hidden flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] [@media(min-height:900px)]:flex">
            Skrolujte
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_2s_ease-in-out_infinite] bg-gold" />
            </span>
          </span>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" />
            {contact.hours[0].days}: {contact.hours[0].time}
          </p>
        </motion.div>
      </section>

      <Introduce />
      <MenuCategories />
      <Showcase />
      <Ambience />
      <Specialties />

      <Highlights />
      <Location />

      <ReservationOptions />
    </>
  )
}
