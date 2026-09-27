import { Link, useLocation } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { menuCategories } from "../lib/menu"
import { menuIcons } from "../lib/menuIcons"
import headerImg from "../assets/images/cevapi-2.jpg"

export default function Menu() {
  const { hash } = useLocation()
  const active = hash.slice(1)

  return (
    <>
      <PageHeader eyebrow="Naša ponuda" title="Meni" image={headerImg} />

      {/* Brza navigacija kroz kategorije */}
      <nav className="sticky top-24 z-30 border-y border-ink-line bg-ink/90 backdrop-blur" aria-label="Kategorije jelovnika">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          {menuCategories.map((cat) => {
            const Icon = menuIcons[cat.id]
            const isActive = active === cat.id
            return (
              <li key={cat.id} className="shrink-0">
                <Link
                  to={`#${cat.id}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive
                      ? "border-gold bg-gold text-ink"
                      : "border-white/15 text-white/70 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-20 sm:px-6 sm:py-28">
        {menuCategories.map((cat, i) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-44">
            <Reveal>
              <div className="relative h-56 overflow-hidden rounded-[2rem] border border-white/10 sm:h-72">
                <img src={cat.image} alt={cat.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
                  <span className="font-serif text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 text-4xl sm:text-5xl">{cat.name}</h2>
                  <p className="mt-2 max-w-md text-white/65">{cat.tagline}</p>
                </div>
              </div>
            </Reveal>

            {/* TODO: stavke jelovnika */}
            <p className="mt-10 text-center text-sm uppercase tracking-[0.2em] text-white/35">Stavke uskoro</p>
          </section>
        ))}
      </div>
    </>
  )
}
