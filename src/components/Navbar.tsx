import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"
import logo from "../assets/logo.png"
import { navLinks } from "./navLinks"
import ReserveButton from "./ReserveButton"
import LanguageSwitcher from "./LanguageSwitcher"
import { ease, useEnterDelay } from "../lib/motion"

// Rezervacija ima svoje dugme sa desne strane, pa je ne prikazujemo među linkovima
const links = navLinks.filter((link) => link.to !== "/rezervacija")

const roll = "duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const enterDelay = useEnterDelay()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: enterDelay, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-ink-line bg-ink/95 backdrop-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="flex h-24 items-center justify-between px-4 sm:px-6 lg:px-10" aria-label="Glavna navigacija">
        <div className="flex items-center gap-14">
          <Link to="/" onClick={() => setOpen(false)} aria-label="Restoran Savić – početna" className="shrink-0">
            <img src={logo} alt="Restoran Savić" className="h-16 w-auto" />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className="group relative block py-2 text-xs font-medium uppercase tracking-[0.25em] focus-visible:outline-none"
                >
                  {({ isActive }) => (
                    <>
                      {/* Tekst se na hover "zarola" nagore i zameni zlatnim */}
                      <span className="relative block overflow-hidden">
                        <span
                          className={`block transition-transform ${roll} group-hover:-translate-y-full group-focus-visible:-translate-y-full ${
                            isActive ? "text-gold" : "text-neutral-300"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span
                          aria-hidden
                          className={`absolute left-0 top-full block text-gold transition-transform ${roll} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}
                        >
                          {link.label}
                        </span>
                      </span>
                      {/* Linija ulazi sleva, izlazi udesno */}
                      <span
                        className={`absolute bottom-0 left-0 h-px w-full bg-gold transition-transform ${roll} ${
                          isActive
                            ? "scale-x-100"
                            : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ReserveButton className="hidden lg:inline-flex" />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            className="flex h-11 w-11 items-center justify-center text-gold lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 border-t border-ink-line px-4 pb-8 pt-4">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-sm uppercase tracking-[0.25em] ${isActive ? "text-gold" : "text-neutral-300"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-4">
                <ReserveButton className="flex w-full justify-between" onClick={() => setOpen(false)} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
