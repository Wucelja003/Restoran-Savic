import { useState, type FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { Check, Phone, Send } from "lucide-react"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { Chips, DatePicker, Field, Input, Stepper, Textarea, TimeSlots } from "../components/FormFields"
import { ease } from "../lib/motion"
import { contact, phoneHref } from "../lib/contact"
import { services, type Service, type ServiceId } from "../lib/reservations"
import headerImg from "../assets/images/restoran-5.jpg"

const celebrationTypes = ["Rođendan", "Slava", "Venčanje", "Krštenje", "Poslovna proslava", "Drugo"]
const cateringTypes = ["Porodično okupljanje", "Slava", "Poslovni događaj", "Proslava", "Drugo"]

const emptyForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  eventType: "",
  address: "",
  note: "",
}

function ReservationForm({ service }: { service: Service }) {
  const [form, setForm] = useState({
    ...emptyForm,
    guests: service.id === "sto" ? 2 : 30,
    eventType: service.id === "proslave" ? celebrationTypes[0] : service.id === "ketering" ? cateringTypes[0] : "",
  })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({ date: false, time: false })
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }))

  // Nema servera – otvaramo email program gosta sa popunjenim zahtevom.
  // TODO: povezati sa servisom za slanje (npr. EmailJS / Formspree) da stiže direktno
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const missing = { date: !form.date, time: service.id === "sto" && !form.time }
    setErrors(missing)
    if (missing.date || missing.time) return
    const lines = [
      `Usluga: ${service.title}`,
      form.eventType && `Vrsta događaja: ${form.eventType}`,
      `Ime i prezime: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Datum: ${form.date.split("-").reverse().join(".")}.`,
      form.time && `Vreme: ${form.time}`,
      `Broj ${service.id === "sto" ? "osoba" : "gostiju"}: ${form.guests}`,
      form.address && `Adresa događaja: ${form.address}`,
      form.note && `Napomena: ${form.note}`,
    ].filter(Boolean)
    const subject = `${service.title} – ${form.name}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col items-center py-10 text-center"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
          <Check className="h-9 w-9" />
        </span>
        <h3 className="mt-6 text-3xl">Zahtev je spreman</h3>
        <p className="mt-3 max-w-sm text-white/60">
          Otvorili smo vaš email program sa popunjenim zahtevom – samo pritisnite <span className="text-white">Pošalji</span>.
          Javićemo vam se što pre.
        </p>
        <p className="mt-6 text-sm text-white/45">Ako se email nije otvorio, pozovite nas:</p>
        <a href={phoneHref} className="mt-2 inline-flex items-center gap-2 font-serif text-2xl text-gold hover:underline">
          <Phone className="h-5 w-5" />
          {contact.phone}
        </a>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-gold"
        >
          ← Nazad na formu
        </button>
      </motion.div>
    )
  }

  const guestsLabel = service.id === "sto" ? "Broj osoba" : service.id === "proslave" ? "Okvirni broj gostiju" : "Broj osoba"

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {service.id === "proslave" && (
        <Field label="Vrsta proslave" group>
          <Chips options={celebrationTypes} value={form.eventType} onChange={(v) => set("eventType", v)} />
        </Field>
      )}
      {service.id === "ketering" && (
        <Field label="Vrsta događaja" group>
          <Chips options={cateringTypes} value={form.eventType} onChange={(v) => set("eventType", v)} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ime i prezime" required>
          <Input required autoComplete="name" placeholder="Petar Petrović" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Telefon" required>
          <Input
            required
            type="tel"
            autoComplete="tel"
            placeholder="06x xxx xxxx"
            pattern="[0-9+ /()-]{6,}"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
      </div>

      {service.id === "sto" ? (
        <>
          <Field label="Datum" required group>
            <DatePicker
              value={form.date}
              invalid={errors.date}
              onChange={(v) => {
                set("date", v)
                set("time", "")
                setErrors((er) => ({ ...er, date: false }))
              }}
            />
            {errors.date && <p className="mt-2 text-xs text-red-300">Izaberite datum.</p>}
          </Field>
          <Field label="Vreme" required group>
            <TimeSlots
              value={form.time}
              date={form.date}
              invalid={errors.time}
              onChange={(v) => {
                set("time", v)
                setErrors((er) => ({ ...er, time: false }))
              }}
            />
            {errors.time && <p className="mt-2 text-xs text-red-300">Izaberite vreme.</p>}
          </Field>
          <Field label={guestsLabel} group>
            <Stepper value={form.guests} onChange={(v) => set("guests", v)} max={50} suffix="osoba" />
          </Field>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Datum" required group>
            <DatePicker
              value={form.date}
              invalid={errors.date}
              onChange={(v) => {
                set("date", v)
                setErrors((er) => ({ ...er, date: false }))
              }}
            />
            {errors.date && <p className="mt-2 text-xs text-red-300">Izaberite datum.</p>}
          </Field>
          <Field label={guestsLabel} group>
            <Stepper value={form.guests} onChange={(v) => set("guests", v)} max={500} />
          </Field>
        </div>
      )}

      {service.id === "ketering" && (
        <Field label="Adresa događaja" required>
          <Input required autoComplete="street-address" placeholder="Ulica i broj, grad" value={form.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
      )}

      <Field label={service.id === "sto" ? "Napomena" : "Vaše želje"}>
        <Textarea
          placeholder={
            service.id === "sto"
              ? "Npr. rođendan, dečja stolica, sto pored prozora…"
              : "Npr. meni, pečenje, dekoracija, posebni zahtevi…"
          }
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
        />
      </Field>

      <button
        type="submit"
        className="btn-flow group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full py-4 text-sm font-semibold uppercase tracking-[0.18em]"
      >
        Pošalji zahtev
        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      </button>
      <p className="text-center text-xs text-white/40">
        Polja sa <span className="text-gold">*</span> su obavezna. Klikom se otvara vaš email sa popunjenim zahtevom.
      </p>
    </form>
  )
}

export default function Reservation() {
  const { hash } = useLocation()
  const initial = services.find((s) => `#${s.id}` === hash)?.id ?? "sto"
  const [active, setActive] = useState<ServiceId>(initial)
  const service = services.find((s) => s.id === active)!

  return (
    <>
      <PageHeader eyebrow="Očekujemo vas" title="Rezervacija" image={headerImg} />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="streak-x hidden sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Naša ponuda</span>
              <span className="streak-x hidden sm:block" />
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              Kako možemo da vam{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">pomognemo?</span>
            </h2>
          </Reveal>

          {/* Izbor usluge */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3 sm:gap-4" role="tablist" aria-label="Vrsta rezervacije">
            {services.map((s, i) => {
              const Icon = s.icon
              const isActive = s.id === active
              return (
                <Reveal key={s.id} delay={i * 0.08}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(s.id)}
                    className={`group relative h-full w-full overflow-hidden rounded-[1.5rem] border p-5 text-left sm:p-6 transition-colors duration-500 ${
                      isActive ? "border-gold/60" : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-active"
                        className="absolute inset-0 bg-gradient-to-br from-gold/15 via-gold/5 to-transparent"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                    <span className="relative flex items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-500 ${
                          isActive ? "border-gold bg-gold text-ink" : "border-gold/40 text-gold group-hover:border-gold"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`font-serif text-sm transition-colors ${isActive ? "text-gold" : "text-white/30"}`}>
                        0{i + 1}
                      </span>
                    </span>
                    <span className="relative mt-4 block font-serif text-xl text-white sm:mt-6 sm:text-2xl">{s.title}</span>
                    <span className="relative mt-2 hidden text-sm leading-relaxed text-white/55 sm:block">{s.short}</span>
                  </button>
                </Reveal>
              )
            })}
          </div>

          {/* Opis + forma za izabranu uslugu */}
          <div id={service.id} className="mt-12 scroll-mt-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
                className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
                role="tabpanel"
              >
                {/* Levo – opis */}
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-6 font-serif text-3xl text-white">{service.heading}</p>
                  </div>
                  <p className="mt-8 leading-relaxed text-white/65">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-white/80">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Radije telefonom?</p>
                      <a href={phoneHref} className="font-serif text-xl text-white transition-colors hover:text-gold">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Desno – forma */}
                <div className="rounded-[2rem] border border-white/10 bg-ink-soft/80 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{service.title}</p>
                  <h3 className="mt-2 text-3xl">Pošaljite zahtev</h3>
                  <div className="mt-8">
                    <ReservationForm key={service.id} service={service} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
