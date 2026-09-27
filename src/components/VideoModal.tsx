import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion } from "motion/react"
import { useLenis } from "lenis/react"
import { X } from "lucide-react"
import { ease } from "../lib/motion"

type VideoModalProps = {
  src: string
  poster?: string
  label: string
  onClose: () => void
}

// Video preko celog ekrana, sa zvukom i kontrolama. Koristiti unutar <AnimatePresence>.
export default function VideoModal({ src, poster, label, onClose }: VideoModalProps) {
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    lenis?.stop()
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", onKey)
    }
  }, [lenis, onClose])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Zatvori video"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
      >
        <X className="h-6 w-6" />
      </button>

      <motion.video
        src={src}
        poster={poster}
        autoPlay
        controls
        playsInline
        onClick={(event) => event.stopPropagation()}
        className="aspect-[9/16] max-h-[85svh] w-auto max-w-full rounded-2xl border border-gold/20 bg-ink shadow-[0_0_80px_rgba(238,191,28,0.15)]"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease }}
      />
    </motion.div>,
    document.body,
  )
}
