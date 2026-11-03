// Svi kontakt podaci na jednom mestu – koriste ih hero, lokacija, footer i rezervacija.
// Adresa je preuzeta sa Google mape restorana.
// TODO: potvrditi email sa vlasnikom
export const contact = {
  street: "Radnička 5a",
  city: { sr: "11000 Beograd", en: "11000 Belgrade, Serbia" },
  phone: "+381 63 316 777",
  // Broj na koji stižu rezervacije preko WhatsApp-a (može biti isti kao telefon)
  whatsapp: "+381 63 316 777",
  email: "restoransavic@gmail.com",
  hours: [{ days: { sr: "Svakog dana", en: "Every day" }, time: "09:00 – 23:00" }],
}

// TODO: pravi linkovi ka društvenim mrežama
export const socials = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
}

// Za tel: link – samo cifre i "+", npr. tel:+38163316777
export const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`

// WhatsApp link sa već napisanom porukom: wa.me/38163316777?text=...
export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
}

export const map = {
  // Tačna lokacija restorana (sa Google mape)
  coords: [44.7879041, 20.4191745] as [number, number],
  // Otvara restoran u Google mapama (aplikacija na telefonu)
  place: "https://www.google.com/maps?cid=10928508787940642810",
  directions: "https://www.google.com/maps/dir/?api=1&destination=44.7879041,20.4191745",
}
