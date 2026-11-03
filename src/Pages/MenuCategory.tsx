import { Link, NavLink, Navigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, Info } from "lucide-react"
import MenuGroupList from "../components/MenuGroupList"
import { menuCategories } from "../lib/menu"
import { menuIcons } from "../lib/menuIcons"
import { menuItems } from "../lib/menuItems"
import { ease, useEnterDelay } from "../lib/motion"
import { useLang, useT } from "../i18n/lang"

// Stranica jedne kategorije jelovnika: /meni/predjela, /meni/glavna-jela …
export default function MenuCategory() {
  const { kategorija } = useParams()
  const enterDelay = useEnterDelay()
  const t = useT()
  const { lang } = useLang()
  const index = menuCategories.findIndex((c) => c.id === kategorija)
  if (index === -1) return <Navigate to="/meni" replace />

  const cat = menuCategories[index]
  const prev = menuCategories[(index - 1 + menuCategories.length) % menuCategories.length]
  const next = menuCategories[(index + 1) % menuCategories.length]
  const total = String(menuCategories.length).padStart(2, "0")

  return (
    <>
      {/* Zaglavlje: slika i naziv velikim slovima */}
      <section className="relative flex h-[60svh] min-h-[420px] items-end overflow-hidden">
        <motion.img
          key={cat.id}
          src={cat.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: enterDelay - 0.1, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />

        <motion.div
          key={`${cat.id}-text`}
          className="relative mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: enterDelay + 0.1, ease }}
        >
          <Link to="/meni" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("Meni", "Menu")} · {String(index + 1).padStart(2, "0")} / {total}
          </Link>
          <h1 className="mt-4 text-6xl leading-none tracking-[0.08em] uppercase sm:text-8xl lg:text-9xl">{cat.name[lang]}</h1>
          <span className="mt-6 block h-px w-24 bg-gold" />
          <p className="mt-5 max-w-xl text-lg text-white/70">{cat.tagline[lang]}</p>
        </motion.div>
      </section>

      {/* Prelazak na druge kategorije */}
      <nav className="sticky top-24 z-30 border-y border-ink-line bg-ink/90 backdrop-blur" aria-label={t("Kategorije jelovnika", "Menu categories")}>
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          {menuCategories.map((c) => {
            const Icon = menuIcons[c.id]
            return (
              <li key={c.id} className="shrink-0">
                <NavLink
                  to={`/meni/${c.id}`}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "border-gold bg-gold text-ink" : "border-white/15 text-white/70 hover:border-gold/50 hover:text-gold"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {c.name[lang]}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <MenuGroupList groups={menuItems[cat.id]} />

        <div className="mt-6 flex items-start justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center text-sm text-white/55 sm:items-center">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:mt-0" />
          <p>{t("Sve cene su izražene u dinarima. Za alergene pitajte konobara.", "All prices are in Serbian dinars (RSD). Please ask your server about allergens.")}</p>
        </div>

        {/* Prethodna / sledeća kategorija */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {[
            { c: prev, label: t("Prethodno", "Previous"), dir: "prev" as const },
            { c: next, label: t("Sledeće", "Next"), dir: "next" as const },
          ].map(({ c, label, dir }) => (
            <Link
              key={dir}
              to={`/meni/${c.id}`}
              className={`group relative isolate flex h-36 items-center overflow-hidden rounded-[1.75rem] border border-white/10 px-7 transition-colors duration-500 hover:border-gold/40 ${
                dir === "next" ? "justify-end text-right" : ""
              }`}
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 to-ink/40" />
              <div className={`flex items-center gap-4 ${dir === "next" ? "flex-row-reverse" : ""}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  {dir === "prev" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-white/50">{label}</span>
                  <span className="block font-serif text-2xl tracking-[0.1em] text-white uppercase">{c.name[lang]}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
