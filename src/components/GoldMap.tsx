import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { map } from "../lib/contact"

// Zlatni pin (HTML), stilovi su u index.css (.gold-pin)
const pinIcon = L.divIcon({
  className: "",
  iconSize: [44, 56],
  iconAnchor: [22, 56],
  html: `
    <div class="gold-pin">
      <span class="gold-pin-pulse"></span>
      <svg class="gold-pin-shape" viewBox="0 0 44 56" aria-hidden="true">
        <path d="M22 0C9.85 0 0 9.85 0 22c0 15.4 19.3 32.2 20.1 32.9a2.9 2.9 0 0 0 3.8 0C24.7 54.2 44 37.4 44 22 44 9.85 34.15 0 22 0Z" />
        <circle cx="22" cy="22" r="8" />
      </svg>
      <span class="gold-pin-label">Restoran Savić</span>
    </div>`,
})

// Interaktivna mapa: siva podloga (OpenStreetMap) + naš zlatni pin
export default function GoldMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const m = L.map(el, {
      center: map.coords,
      zoom: 16,
      scrollWheelZoom: false, // da mapa ne "hvata" skrol stranice
      zoomControl: false,
    })

    L.control.zoom({ position: "topright" }).addTo(m)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      className: "map-tiles-gray",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(m)
    L.marker(map.coords, { icon: pinIcon, title: "Restoran Savić", keyboard: false }).addTo(m)

    // Mapa mora da zna svoju veličinu i kad se kartica animira/menja
    const observer = new ResizeObserver(() => m.invalidateSize())
    observer.observe(el)

    return () => {
      observer.disconnect()
      m.remove()
    }
  }, [])

  return <div ref={ref} className={className} />
}
