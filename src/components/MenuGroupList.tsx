import Reveal from "./Reveal"
import { formatPrice, type MenuGroup } from "../lib/menuItems"

// Jedna grupa jelovnika (npr. "Hladna predjela"): naslov velikim slovima,
// dekorativna slika desno od naslova (ako postoji) i stavke sa tačkicama do cene.
function Group({ group, index }: { group: MenuGroup; index: number }) {
  const tilt = index % 2 === 0 ? "rotate-3" : "-rotate-3"

  return (
    <Reveal className="mb-20 sm:mb-24">
      <div className="flex items-center justify-between gap-4 border-b border-gold/30 pb-5">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl tracking-[0.16em] text-white uppercase sm:text-4xl">{group.title}</h3>
          {group.note && <p className="mt-2 text-sm uppercase tracking-[0.15em] text-gold/80">{group.note}</p>}
        </div>

        {/* Dekorativna slika desno od naslova – blago nestaje prema naslovu */}
        {group.image && (
          <img
            src={group.image}
            alt=""
            aria-hidden
            loading="lazy"
            className={`pointer-events-none h-28 w-28 shrink-0 select-none rounded-full object-cover opacity-60 [mask-image:linear-gradient(to_left,#000_55%,transparent)] sm:h-44 sm:w-44 ${tilt}`}
          />
        )}
      </div>

      <ul className="mt-3">
        {group.items.map((item, i) => (
          <li
            key={`${item.name}-${item.detail ?? ""}-${i}`}
            className="group -mx-4 flex items-baseline gap-4 rounded-xl px-4 py-4 transition-colors duration-300 hover:bg-white/[0.03] sm:py-5"
          >
            <span className="min-w-0">
              <span className="text-lg text-white/90 transition-colors group-hover:text-white sm:text-xl">{item.name}</span>
              {item.detail && <span className="ml-3 whitespace-nowrap text-sm text-white/45">{item.detail}</span>}
            </span>
            {/* Tačkice do cene */}
            <span aria-hidden className="min-w-6 flex-1 translate-y-[-5px] border-b border-dotted border-white/20" />
            <span className="whitespace-nowrap font-serif text-xl text-gold tabular-nums sm:text-2xl">
              {formatPrice(item.price)}
              <span className="ml-1.5 font-sans text-xs text-white/45">din.</span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

// Sve grupe u jednoj koloni, jedna ispod druge, na sredini stranice
export default function MenuGroupList({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {groups.map((group, i) => (
        <Group key={group.title} group={group} index={i} />
      ))}
    </div>
  )
}
