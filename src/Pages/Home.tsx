import { motion, type Variants } from "motion/react"
import Button from "../components/Button"
import Reveal from "../components/Reveal"
import Introduce from "../components/Introduce"
import Specialties from "../components/Specialties"
import Highlights from "../components/Highlights"
import MenuCategories from "../components/MenuCategories"
import Showcase from "../components/Showcase"
import Location from "../components/Location"
import { ease, useEnterDelay } from "../lib/motion"
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
        <div className="absolute inset-0 bg-ink/70" />
        <motion.div
          className="relative px-4 text-center"
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          <motion.p variants={heroItem} className="text-xs uppercase tracking-[0.4em] text-gold sm:text-sm">
            Dobrodošli u
          </motion.p>
          <motion.h1 variants={heroItem} className="mt-4 text-5xl sm:text-7xl">
            Restoran Savić
          </motion.h1>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease } } }}
            className="mx-auto mt-6 h-px w-24 bg-gold"
          />
          <motion.p variants={heroItem} className="mx-auto mt-6 max-w-xl text-base text-neutral-300 sm:text-lg">
            Domaća kuhinja, roštilj i riba u toplom ambijentu.
          </motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/rezervacija">Rezerviši sto</Button>
            <Button to="/meni" variant="outline">Pogledaj meni</Button>
          </motion.div>
        </motion.div>
      </section>

      <Introduce />
      <MenuCategories />
      <Specialties />

      <Highlights />
      <Showcase />
      <Location />

      {/* Poziv na rezervaciju */}
      <Reveal className="px-4 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl">Rezervišite svoj sto</h2>
        <p className="mx-auto mt-4 max-w-md text-neutral-400">
          Za porodične ručkove, poslovne večere i proslave.
        </p>
        <div className="mt-10">
          <Button to="/rezervacija">Rezervacija</Button>
        </div>
      </Reveal>
    </>
  )
}
