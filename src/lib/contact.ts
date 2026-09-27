// Svi kontakt podaci na jednom mestu – koriste ih sekcija "Lokacija" i footer.
// Adresa je preuzeta sa Google mape restorana.
// TODO: potvrditi telefon, email i radno vreme sa vlasnikom
export const contact = {
  street: "Radnička 5a",
  city: "11000 Beograd",
  phone: "+381 00 000 0000",
  email: "info@restoransavic.rs",
  hours: [
    { days: "Ponedeljak – Petak", time: "08:00 – 23:00" },
    { days: "Subota – Nedelja", time: "09:00 – 00:00" },
  ],
}

// TODO: pravi linkovi ka društvenim mrežama
export const socials = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
}

// Za tel: link – samo cifre i "+"
export const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`

export const map = {
  // Tačna lokacija restorana (sa Google mape)
  coords: [44.7879041, 20.4191745] as [number, number],
  // Otvara restoran u Google mapama (aplikacija na telefonu)
  place: "https://www.google.com/maps?cid=10928508787940642810",
  directions: "https://www.google.com/maps/dir/?api=1&destination=44.7879041,20.4191745",
}
