import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Mail, Phone } from "lucide-react"
import logo from "../assets/logo.png"
import { navLinks } from "./navLinks"
import { ease } from "../lib/motion"
import { contact, phoneHref, socials } from "../lib/contact"

// lucide-react više nema brend ikonice, pa ih crtamo sami
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.53l.38-2.93H13.5V8.7c0-.85.24-1.43 1.45-1.43h1.56V4.65a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.14H7.9v2.93h2.55V21h3.05Z" />
    </svg>
  )
}

const socialLinks = [
  { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
]

const heading = "text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45"

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-ink-line bg-ink px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8"
        >
          {/* Logo */}
          <div className="flex items-start gap-5">
            <img src={logo} alt="Restoran Savić" className="h-20 w-auto shrink-0" />
            <p className="font-serif text-2xl leading-[1.1] text-white sm:text-3xl">
              100 godina
              <br />
              <span className="text-gold">tradicije</span>
            </p>
          </div>

          {/* Navigacija */}
          <div className="flex flex-col gap-4">
            <h4 className={heading}>Navigacija</h4>
            <ul className="flex flex-col gap-2 font-serif text-xl text-white sm:text-2xl">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Adresa i radno vreme */}
          <div className="flex flex-col gap-4">
            <h4 className={heading}>Posetite nas</h4>
            <p className="font-serif text-xl leading-tight text-white sm:text-2xl">
              {contact.street}
              <br />
              <span className="text-white/60">{contact.city}</span>
            </p>
            <ul className="space-y-1 text-sm text-white/55">
              {contact.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: <span className="text-white/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Društvene mreže */}
          <div className="flex flex-col gap-4">
            <h4 className={heading}>Pratite nas</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-end gap-8 border-t border-ink-line pt-10 lg:grid-cols-2">
          <div className="flex flex-col gap-2 text-xs text-white/45 sm:text-sm">
            <p>
              © {new Date().getFullYear()} • Restoran Savić • Sva prava zadržana.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/meni" className="transition-colors hover:text-gold">
                Meni
              </Link>
              <span className="text-white/25">•</span>
              <Link to="/rezervacija" className="transition-colors hover:text-gold">
                Rezervacija
              </Link>
            </div>
          </div>

          {/* Umesto polja za email – poziv za rezervaciju */}
          <div>
            <h4 className={`${heading} mb-3`}>Rezervacije i informacije</h4>
            <div className="flex items-center rounded-full border border-white/15 bg-ink p-1.5 transition-colors duration-300 hover:border-gold/40">
              <a
                href={phoneHref}
                className="min-w-0 flex-1 truncate rounded-full px-3 py-2 text-sm tracking-[0.05em] text-white sm:px-5 sm:tracking-[0.15em] transition-colors hover:text-gold"
              >
                {contact.phone}
              </a>
              <a
                href={phoneHref}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-4 py-2.5 sm:px-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-[#f5cf45]"
              >
                <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                Pozovite nas
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
