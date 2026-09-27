import { useId, type ReactNode } from "react"
import { motion } from "motion/react"

/* List starog papira sa "pocepanim" ivicama (SVG filter pomera ivice pozadine, tekst ostaje oštar) */
export function PaperSheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  const id = useId().replace(/:/g, "")
  return (
    <div className={`relative isolate ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={`paper-edge-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="paper-bg -z-10" style={{ filter: `url(#paper-edge-${id})` }} />
      {children}
    </div>
  )
}

type WrittenTitleProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  as?: "h2" | "h3" | "p"
  // ako je zadato, animacija kreće kad postane true; inače kad naslov uđe u vidno polje
  show?: boolean
}

/* Naslov koji se "ispisuje perom" – otkriva se sleva nadesno */
export function WrittenTitle({ children, className = "", delay = 0, duration = 1.6, as = "h2", show }: WrittenTitleProps) {
  const Comp = as === "h3" ? motion.h3 : as === "p" ? motion.p : motion.h2
  const trigger =
    show === undefined
      ? { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } }
      : { animate: show ? "visible" : "hidden" }

  return (
    <Comp
      className={`inline-block px-3 py-2 ${className}`}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: { clipPath: "inset(0 0% 0 0)", transition: { duration, delay, ease: [0.45, 0, 0.55, 1] } },
      }}
    >
      {children}
    </Comp>
  )
}
