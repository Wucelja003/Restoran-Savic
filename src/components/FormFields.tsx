import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"

const fieldBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 transition-colors duration-300 [color-scheme:dark] hover:border-white/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"

// `group` – za polja sa više dugmića (brojač, pilule): <div role="group"> umesto <label>,
// jer bi klik na <label> "kliknuo" prvo dugme unutra
export function Field({
  label,
  required,
  group,
  children,
  className = "",
}: {
  label: string
  required?: boolean
  group?: boolean
  children: ReactNode
  className?: string
}) {
  const title = (
    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
      {label}
      {required && <span className="ml-1 text-gold">*</span>}
    </span>
  )
  return group ? (
    <div role="group" aria-label={label} className={className}>
      {title}
      {children}
    </div>
  ) : (
    <label className={`block ${className}`}>
      {title}
      {children}
    </label>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={`${fieldBase} resize-none ${props.className ?? ""}`} />
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${fieldBase} appearance-none pr-10 ${props.className ?? ""}`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
    </div>
  )
}

/* Broj osoba sa dugmićima − / + */
export function Stepper({
  value,
  onChange,
  min = 1,
  max = 500,
  suffix,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  suffix?: string
}) {
  const btn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink disabled:pointer-events-none disabled:opacity-30"
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Manje">
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
        className="w-full min-w-0 bg-transparent text-center font-serif text-2xl text-white [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={suffix ?? "Broj"}
      />
      {suffix && <span className="hidden shrink-0 text-xs uppercase tracking-[0.15em] text-white/40 sm:inline">{suffix}</span>}
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Više">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

/* Izbor jedne opcije kao "pilule" */
export function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
              active ? "border-gold bg-gold text-ink" : "border-white/15 text-white/70 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ===== Datum: polje + kalendar koji se otvara ===== */

const pad = (n: number) => String(n).padStart(2, "0")
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}
const startOfToday = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
const weekdays = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"]
const monthName = new Intl.DateTimeFormat("sr-Latn", { month: "long", year: "numeric" })
const longDate = new Intl.DateTimeFormat("sr-Latn", { weekday: "long", day: "numeric", month: "long" })

export function DatePicker({
  value,
  onChange,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const today = startOfToday()
  const [view, setView] = useState(() => {
    const base = value ? fromKey(value) : today
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const pick = (d: Date) => {
    onChange(toKey(d))
    setOpen(false)
  }

  // Ponedeljak je prvi dan u nedelji
  const offset = (view.getDay() + 6) % 7
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const isCurrentMonth = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth()
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  const label = value ? longDate.format(fromKey(value)) : ""

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`${fieldBase} flex items-center gap-3 text-left ${invalid ? "border-red-400/70" : ""}`}
      >
        <CalendarDays className="h-5 w-5 shrink-0 text-gold" />
        <span className={`flex-1 truncate ${label ? "text-white first-letter:uppercase" : "text-white/30"}`}>
          {label || "Izaberite datum"}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-30 mt-2 w-full min-w-[290px] rounded-2xl border border-white/10 bg-ink-soft p-4 shadow-[0_30px_60px_rgba(0,0,0,0.7)] sm:w-[340px]"
            data-lenis-prevent
          >
            {/* Mesec */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                disabled={isCurrentMonth}
                aria-label="Prethodni mesec"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10 disabled:opacity-20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="font-serif text-lg text-white first-letter:uppercase">{monthName.format(view).replace(/\.$/, "")}</p>
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                aria-label="Sledeći mesec"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Dani */}
            <div className="mt-3 grid grid-cols-7 gap-1 text-center">
              {weekdays.map((w) => (
                <span key={w} className="py-1 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  {w}
                </span>
              ))}
              {Array.from({ length: offset }, (_, i) => (
                <span key={`e${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d = new Date(view.getFullYear(), view.getMonth(), i + 1)
                const key = toKey(d)
                const past = d < today
                const selected = key === value
                const isToday = key === toKey(today)
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={past}
                    onClick={() => pick(d)}
                    className={`aspect-square rounded-full text-sm transition-colors ${
                      selected
                        ? "bg-gold font-semibold text-ink"
                        : past
                          ? "text-white/15"
                          : `text-white/85 hover:bg-gold/15 hover:text-gold ${isToday ? "ring-1 ring-gold/50" : ""}`
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            {/* Brzi izbor */}
            <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
              {[
                { label: "Danas", date: today },
                { label: "Sutra", date: tomorrow },
              ].map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => pick(q.date)}
                  className="flex-1 rounded-full border border-white/15 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ===== Vreme: termini kao dugmići, podeljeni na ručak i večeru ===== */

// TODO: uskladiti termine sa radnim vremenom restorana
const slotGroups = [
  { label: "Ručak", from: 12 * 60, to: 15 * 60 + 30 },
  { label: "Večera", from: 16 * 60, to: 22 * 60 },
]

export function TimeSlots({
  value,
  onChange,
  date,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  date: string
  invalid?: boolean
}) {
  // Za današnji dan sakrivamo termine koji su prošli (uz 30 min rezerve)
  const now = new Date()
  const isToday = date === toKey(startOfToday())
  const nowMinutes = now.getHours() * 60 + now.getMinutes() + 30

  return (
    <div className={`space-y-4 rounded-xl ${invalid ? "ring-1 ring-red-400/70 ring-offset-4 ring-offset-ink-soft" : ""}`}>
      {slotGroups.map((g) => {
        const slots = []
        for (let m = g.from; m <= g.to; m += 30) slots.push(m)
        return (
          <div key={g.label}>
            <p className="mb-2 text-xs text-white/40">{g.label}</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {slots.map((m) => {
                const t = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
                const past = isToday && m < nowMinutes
                const selected = t === value
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={past}
                    onClick={() => onChange(t)}
                    className={`rounded-xl border py-2.5 text-sm transition-colors ${
                      selected
                        ? "border-gold bg-gold font-semibold text-ink"
                        : past
                          ? "border-white/5 text-white/15 line-through"
                          : "border-white/10 text-white/80 hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
