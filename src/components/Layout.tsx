import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useLenis } from "lenis/react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Intro from "./Intro"
import BackgroundGrid from "./BackgroundGrid"

export default function Layout() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const prevPathname = useRef(pathname)

  // Nova stranica → na vrh. Link sa #kategorijom → skrol do te sekcije
  // (odmah ako dolazimo sa druge stranice, glatko ako smo već na njoj).
  useEffect(() => {
    const samePage = prevPathname.current === pathname
    prevPathname.current = pathname
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null

    if (target) {
      // Računamo iz window.scrollY – Lenis posle promene stranice još pamti staru visinu
      const y = target.getBoundingClientRect().top + window.scrollY - 170
      if (lenis) {
        lenis.resize()
        lenis.scrollTo(y, { immediate: !samePage })
      } else {
        window.scrollTo(0, y)
      }
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, lenis])

  return (
    <div className="flex min-h-svh flex-col">
      <Intro />
      <BackgroundGrid />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
