import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

const MotionLink = motion.create(Link)

type ReserveButtonProps = {
  // className mora da sadrži display (npr. "inline-flex" ili "hidden md:inline-flex")
  className?: string
  onClick?: () => void
}

export default function ReserveButton({ className = "inline-flex", onClick }: ReserveButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionLink
      to="/rezervacija"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      animate={
        reduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 0 0 rgba(238, 191, 28, 0.45)",
                "0 0 0 12px rgba(238, 191, 28, 0)",
              ],
            }
      }
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 17 },
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeOut" },
      }}
      className={`group relative items-center gap-3 overflow-hidden rounded-full bg-gold py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-[#f5cf45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          initial={{ x: "-150%" }}
          animate={{ x: "400%" }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      )}

      <span className="relative">Rezerviši sto</span>

      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-gold">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-8" />
        <ArrowRight className="absolute h-4 w-4 -translate-x-8 transition-transform duration-300 group-hover:translate-x-0" />
      </span>
    </MotionLink>
  )
}
