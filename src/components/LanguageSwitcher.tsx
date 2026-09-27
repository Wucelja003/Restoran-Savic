import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown, Languages } from "lucide-react"

// TODO: povezati sa pravim prevodom (npr. i18next) – zasad se samo pamti izbor
const languages = [
  { code: "sr", label: "Srpski" },
  { code: "en", label: "English" },
]

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState("sr")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-3 w-40 origin-top-right overflow-hidden rounded-xl border border-ink-line bg-ink-soft py-1 shadow-xl"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    setCurrent(lang.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                    current === lang.code ? "text-gold" : "text-neutral-300"
                  }`}
                >
                  {lang.label}
                  {current === lang.code && <Check className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Promeni jezik"
        className="flex h-11 items-center gap-1.5 rounded-full border border-gold/40 px-3.5 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/10"
      >
        <Languages className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-widest">{current}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  )
}
