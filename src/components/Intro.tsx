import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import logo from "../assets/logo.png"
import { ease, INTRO_HOLD, markIntroPlayed, playIntro } from "../lib/motion"

export default function Intro() {
  const [visible, setVisible] = useState(playIntro)
  const lenis = useLenis()

  useEffect(() => {
    if (!visible) return
    markIntroPlayed()
    const timer = setTimeout(() => setVisible(false), INTRO_HOLD)
    return () => clearTimeout(timer)
  }, [visible])

  // Zaključaj skrol dok traje intro
  useEffect(() => {
    if (!lenis) return
    if (visible) lenis.stop()
    else lenis.start()
  }, [lenis, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={logo}
            alt="Restoran Savić"
            className="w-40 sm:w-52"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease }}
          />
          <motion.span
            className="mt-8 h-px w-32 origin-left bg-gold sm:w-40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
