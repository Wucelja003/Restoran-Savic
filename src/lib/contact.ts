// Svi kontakt podaci na jednom mestu – koriste ih hero, lokacija, footer i rezervacija.
// Adresa je preuzeta sa Google mape restorana.
// TODO: potvrditi email sa vlasnikom
export const contact = {
  street: "Radnička 5a",
  city: "11000 Beograd",
  phone: "063 316 777",
  email: "info@restoransavic.rs",
  // Za prikaz (footer, lokacija)
  hours: [
    { days: "Ponedeljak – Sreda", time: "11:00 – 23:00" },
    { days: "Četvrtak – Subota", time: "11:00 – 01:00" },
    { days: "Nedelja", time: "11:00 – 23:00" },
  ],
}

// Radno vreme po danima (indeks kao Date.getDay(): 0 = nedelja). Zatvaranje posle ponoći se piše kao 01:00.
export const weeklyHours = [
  { open: "11:00", close: "23:00" }, // nedelja
  { open: "11:00", close: "23:00" }, // ponedeljak
  { open: "11:00", close: "23:00" }, // utorak
  { open: "11:00", close: "23:00" }, // sreda
  { open: "11:00", close: "01:00" }, // četvrtak
  { open: "11:00", close: "01:00" }, // petak
  { open: "11:00", close: "01:00" }, // subota
]

// Radno vreme za današnji dan, npr. "11:00 – 01:00"
export function todayHours() {
  const h = weeklyHours[new Date().getDay()]
  return `${h.open} – ${h.close}`
}

// TODO: pravi linkovi ka društvenim mrežama
export const socials = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
}

// Za tel: link – međunarodni format (063… → +38163…), radi i iz inostranstva
export const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "").replace(/^0/, "+381")}`

export const map = {
  // Tačna lokacija restorana (sa Google mape)
  coords: [44.7879041, 20.4191745] as [number, number],
  // Otvara restoran u Google mapama (aplikacija na telefonu)
  place: "https://www.google.com/maps?cid=10928508787940642810",
  directions: "https://www.google.com/maps/dir/?api=1&destination=44.7879041,20.4191745",
}
