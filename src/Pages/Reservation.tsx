import { useState, type FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { Check, Phone } from "lucide-react"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { Chips, DatePicker, Field, Input, Stepper, Textarea, TimeSlots } from "../components/FormFields"
import { ease } from "../lib/motion"
import { contact, phoneHref, whatsappHref } from "../lib/contact"
import WhatsAppIcon from "../components/WhatsAppIcon"
import { services, type Service, type ServiceId } from "../lib/reservations"
import headerImg from "../assets/images/restoran-5.jpg"
import { useLang, useT } from "../i18n/lang"

const celebrationTypes = [
  { sr: "Rođendan", en: "Birthday" },
  { sr: "Slava", en: "Slava (family feast day)" },
  { sr: "Venčanje", en: "Wedding" },
  { sr: "Krštenje", en: "Christening" },
  { sr: "Poslovna proslava", en: "Corporate event" },
  { sr: "Drugo", en: "Other" },
]
const cateringTypes = [
  { sr: "Porodično okupljanje", en: "Family gathering" },
  { sr: "Slava", en: "Slava (family feast day)" },
  { sr: "Poslovni događaj", en: "Business event" },
  { sr: "Proslava", en: "Celebration" },
  { sr: "Drugo", en: "Other" },
]

const emptyForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  // indeks u celebrationTypes / cateringTypes (-1 = nije izabrano) – da izbor ostane i pri promeni jezika
  eventType: -1,
  address: "",
  note: "",
}

function ReservationForm({ service }: { service: Service }) {
  const [form, setForm] = useState({
    ...emptyForm,
    guests: service.id === "sto" ? 2 : 30,
    eventType: service.id === "sto" ? -1 : 0,
  })
  const t = useT()
  const { lang } = useLang()
  const eventTypes = (service.id === "ketering" ? cateringTypes : celebrationTypes).map((x) => x[lang])
  const eventType = eventTypes[form.eventType] ?? ""
  const [sentLink, setSentLink] = useState<string | null>(null)
  const [errors, setErrors] = useState({ date: false, time: false })
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }))

  // Nema servera – otvaramo WhatsApp gosta sa već napisanom porukom ka broju restorana,
  // gost samo pritisne "Pošalji". Broj se menja u lib/contact.ts (whatsapp).
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const missing = { date: !form.date, time: service.id === "sto" && !form.time }
    setErrors(missing)
    if (missing.date || missing.time) return

    const [y, m, d] = form.date.split("-").map(Number)
    const date = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "sr-Latn", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(
      new Date(y, m - 1, d),
    )
    const lines = [
      `*${t("Nova rezervacija", "New booking")} – ${service.title[lang]}*`,
      "",
      eventType ? `🎉 ${t("Vrsta", "Occasion")}: ${eventType}` : null,
      `👤 ${t("Ime i prezime", "Name")}: ${form.name}`,
      `📞 ${t("Telefon", "Phone")}: ${form.phone}`,
      `📅 ${t("Datum", "Date")}: ${date}`,
      form.time ? `🕗 ${t("Vreme", "Time")}: ${form.time}` : null,
      `👥 ${service.id === "sto" ? t("Broj osoba", "Party size") : t("Broj gostiju", "Number of guests")}: ${form.guests}`,
      form.address ? `📍 ${t("Adresa", "Address")}: ${form.address}` : null,
      form.note ? `📝 ${t("Napomena", "Notes")}: ${form.note}` : null,
      "",
      t("Poslato sa sajta restoran-savic.vercel.app", "Sent from restoran-savic.vercel.app"),
    ].filter((l): l is string => l !== null)

    const link = whatsappHref(lines.join("\n"))
    // Nova kartica (na telefonu se otvara aplikacija WhatsApp); ako je blokirana, otvori u istoj
    const win = window.open(link, "_blank", "noopener")
    if (!win) window.location.href = link
    setSentLink(link)
  }

  if (sentLink) {
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
        <h3 className="mt-6 text-3xl">{t("Još samo jedan korak", "Just one more step")}</h3>
        <p className="mt-3 max-w-sm text-white/60">
          {t("Otvorili smo WhatsApp sa vašom porukom – samo pritisnite", "We have opened WhatsApp with your message – just tap")}{" "}
          <span className="text-white">{t("Pošalji", "Send")}</span>
          {t(". Javićemo vam se što pre da potvrdimo.", ". We will get back to you shortly to confirm.")}
        </p>
        <a
          href={sentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t("Otvori WhatsApp ponovo", "Open WhatsApp again")}
        </a>
        <p className="mt-6 text-sm text-white/45">{t("Nemate WhatsApp? Pozovite nas:", "No WhatsApp? Give us a call:")}</p>
        <a href={phoneHref} className="mt-2 inline-flex items-center gap-2 font-serif text-2xl text-gold hover:underline">
          <Phone className="h-5 w-5" />
          {contact.phone}
        </a>
        <button
          type="button"
          onClick={() => setSentLink(null)}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-gold"
        >
          ← {t("Nazad na formu", "Back to the form")}
        </button>
      </motion.div>
    )
  }

  const guestsLabel =
    service.id === "proslave" ? t("Okvirni broj gostiju", "Approximate number of guests") : t("Broj osoba", "Number of guests")

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {service.id === "proslave" && (
        <Field label={t("Vrsta proslave", "Type of celebration")} group>
          <Chips options={eventTypes} value={eventType} onChange={(v) => set("eventType", eventTypes.indexOf(v))} />
        </Field>
      )}
      {service.id === "ketering" && (
        <Field label={t("Vrsta događaja", "Type of event")} group>
          <Chips options={eventTypes} value={eventType} onChange={(v) => set("eventType", eventTypes.indexOf(v))} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("Ime i prezime", "Full name")} required>
          <Input required autoComplete="name" placeholder={t("Petar Petrović", "John Smith")} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label={t("Telefon", "Phone")} required>
          <Input
            required
            type="tel"
            autoComplete="tel"
            placeholder={t("06x xxx xxxx", "+381 6x xxx xxxx")}
            pattern="[0-9+ /()-]{6,}"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
      </div>

      {service.id === "sto" ? (
        <>
          <Field label={t("Datum", "Date")} required group>
            <DatePicker
              value={form.date}
              invalid={errors.date}
              onChange={(v) => {
                set("date", v)
                set("time", "")
                setErrors((er) => ({ ...er, date: false }))
              }}
            />
            {errors.date && <p className="mt-2 text-xs text-red-300">{t("Izaberite datum.", "Please choose a date.")}</p>}
          </Field>
          <Field label={t("Vreme", "Time")} required group>
            <TimeSlots
              value={form.time}
              date={form.date}
              invalid={errors.time}
              onChange={(v) => {
                set("time", v)
                setErrors((er) => ({ ...er, time: false }))
              }}
            />
            {errors.time && <p className="mt-2 text-xs text-red-300">{t("Izaberite vreme.", "Please choose a time.")}</p>}
          </Field>
          <Field label={guestsLabel} group>
            <Stepper value={form.guests} onChange={(v) => set("guests", v)} max={50} suffix={t("osoba", "guests")} />
          </Field>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("Datum", "Date")} required group>
            <DatePicker
              value={form.date}
              invalid={errors.date}
              onChange={(v) => {
                set("date", v)
                setErrors((er) => ({ ...er, date: false }))
              }}
            />
            {errors.date && <p className="mt-2 text-xs text-red-300">{t("Izaberite datum.", "Please choose a date.")}</p>}
          </Field>
          <Field label={guestsLabel} group>
            <Stepper value={form.guests} onChange={(v) => set("guests", v)} max={500} />
          </Field>
        </div>
      )}

      {service.id === "ketering" && (
        <Field label={t("Adresa događaja", "Event address")} required>
          <Input required autoComplete="street-address" placeholder={t("Ulica i broj, grad", "Street address, city")} value={form.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
      )}

      <Field label={service.id === "sto" ? t("Napomena", "Notes") : t("Vaše želje", "Your requests")}>
        <Textarea
          placeholder={
            service.id === "sto"
              ? t("Npr. rođendan, dečja stolica, sto pored prozora…", "E.g. a birthday, a high chair, a table by the window…")
              : t("Npr. meni, pečenje, dekoracija, posebni zahtevi…", "E.g. the menu, roasts, decorations, special requests…")
          }
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
        />
      </Field>

      <button
        type="submit"
        className="btn-flow group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full py-4 text-sm font-semibold uppercase tracking-[0.18em]"
      >
        <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        {t("Pošalji preko WhatsApp-a", "Send via WhatsApp")}
      </button>
      <p className="text-center text-xs text-white/40">
        {t("Polja sa", "Fields marked")} <span className="text-gold">*</span>{" "}
        {t("su obavezna. Klikom se otvara WhatsApp sa popunjenom porukom.", "are required. Clicking opens WhatsApp with your message ready to send.")}
      </p>
    </form>
  )
}

export default function Reservation() {
  const { hash } = useLocation()
  const initial = services.find((s) => `#${s.id}` === hash)?.id ?? "sto"
  const [active, setActive] = useState<ServiceId>(initial)
  const service = services.find((s) => s.id === active)!
  const t = useT()
  const { lang } = useLang()

  return (
    <>
      <PageHeader eyebrow={t("Očekujemo vas", "We look forward to seeing you")} title={t("Rezervacija", "Reservations")} image={headerImg} />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="streak-x hidden sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{t("Naša ponuda", "What we offer")}</span>
              <span className="streak-x hidden sm:block" />
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl">
              {t("Kako možemo da vam", "How can we")}{" "}
              <span className="bg-gradient-to-b from-[#fbe7a1] via-gold to-gold-dark bg-clip-text text-transparent">{t("pomognemo?", "help you?")}</span>
            </h2>
          </Reveal>

          {/* Izbor usluge */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3 sm:gap-4" role="tablist" aria-label={t("Vrsta rezervacije", "Type of booking")}>
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
                    <span className="relative mt-4 block font-serif text-xl text-white sm:mt-6 sm:text-2xl">{s.title[lang]}</span>
                    <span className="relative mt-2 hidden text-sm leading-relaxed text-white/55 sm:block">{s.short[lang]}</span>
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
                    <img src={service.image} alt={service.title[lang]} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-6 font-serif text-3xl text-white">{service.heading[lang]}</p>
                  </div>
                  <p className="mt-8 leading-relaxed text-white/65">{service.description[lang]}</p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((f) => (
                      <li key={f.sr} className="flex items-start gap-3 text-white/80">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {f[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{t("Radije telefonom?", "Prefer to call?")}</p>
                      <a href={phoneHref} className="font-serif text-xl text-white transition-colors hover:text-gold">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Desno – forma */}
                <div className="rounded-[2rem] border border-white/10 bg-ink-soft/80 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{service.title[lang]}</p>
                  <h3 className="mt-2 text-3xl">{t("Pošaljite zahtev", "Send a request")}</h3>
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
