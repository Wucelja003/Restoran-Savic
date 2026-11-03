import type { MenuCategoryId } from "./menu"
import hladnaImg from "../assets/menu/thumbs/hladna.jpg"
import toplaImg from "../assets/menu/thumbs/topla.jpg"
import rostiljImg from "../assets/menu/thumbs/rostilj.jpg"
import porudzbinaImg from "../assets/menu/thumbs/porudzbina.jpg"
import posniImg from "../assets/menu/thumbs/posni.jpg"
import pecenjeImg from "../assets/menu/thumbs/pecenje.jpg"
import dezertiImg from "../assets/menu/thumbs/dezerti.jpg"
import rakijaImg from "../assets/menu/thumbs/rakija.jpg"
import vinaImg from "../assets/menu/thumbs/vina.jpg"

// Stavke jelovnika, prepisane sa štampanog menija restorana.
// price: broj = cena u dinarima; tekst = više cena (npr. rakija "300 / 390").
// detail: gramaža ili količina, prikazuje se sitnije pored naziva.
// image: dekorativna slika desno od naslova grupe (samo gde imamo fotografiju)
export type MenuItem = { name: string; detail?: string; price: number | string }
export type MenuGroup = { title: string; note?: string; image?: string; items: MenuItem[] }

export const menuItems: Record<MenuCategoryId, MenuGroup[]> = {
  predjela: [
    {
      title: "Hladna predjela",
      image: hladnaImg,
      items: [
        { name: "Predjelo Savić", detail: "400 g", price: 2000 },
        { name: "Pršut", detail: "100 g", price: 1100 },
        { name: "Domaći kajmak", detail: "150 g", price: 780 },
        { name: "Paprika u pavlaci", detail: "250 g", price: 680 },
        { name: "Kulen", detail: "100 g", price: 800 },
        { name: "Sjenički sir", detail: "200 g", price: 720 },
        { name: "Pančeta", detail: "100 g", price: 800 },
        { name: "Pihtije", price: 750 },
        { name: "Tatar biftek", detail: "250 g", price: 4000 },
      ],
    },
    {
      title: "Topla predjela",
      image: toplaImg,
      items: [
        { name: "Pohovani kačkavalj", detail: "200 g", price: 650 },
        { name: "Pečurke na žaru", detail: "200 g", price: 550 },
        { name: "Pohovane punjene paprike", price: 900 },
        { name: "Suve šljive u slanini", price: 600 },
      ],
    },
  ],

  "glavna-jela": [
    {
      title: "Doručak",
      items: [
        { name: "Omlet sa slaninom i sirom", price: 600 },
        { name: "Omlet sa šunkom i sirom", price: 600 },
        { name: "Omlet sa pršutom", price: 680 },
        { name: "Prženice sa pršutom i kajmakom", price: 700 },
        { name: "Komplet lepinja", price: 600 },
        { name: "Gibanica", price: 650 },
        { name: "Kačamak", price: 400 },
        { name: "Cicvara", price: 500 },
        { name: "Uštipci od testa", price: 500 },
      ],
    },
    {
      title: "Supe i čorbe",
      items: [
        { name: "Teleća čorba", price: 450 },
        { name: "Jagnjeća čorba", price: 450 },
        { name: "Domaća supa sa rezancima", price: 400 },
      ],
    },
    {
      title: "Roštilj",
      image: rostiljImg,
      items: [
        { name: "Bela vešalica", detail: "300 g", price: 1250 },
        { name: "Punjena bela vešalica", detail: "400 g", price: 1520 },
        { name: "Medaljoni na žaru", detail: "300 g", price: 1350 },
        { name: "Rolovani pileći file", price: 1350 },
        { name: "Ćevapi Savić", detail: "300 g", price: 1300 },
        { name: "Pljeskavica", detail: "300 g", price: 1250 },
        { name: "Gurmanska pljeskavica", detail: "350 g", price: 1350 },
        { name: "Savić uštipci", detail: "300 g", price: 1250 },
        { name: "Ražnjići", detail: "300 g", price: 1190 },
        { name: "Mešano meso", detail: "500 g", price: 2200 },
        { name: "Domaće kobasice", price: 1190 },
        { name: "Jagnjeća džigerica na žaru", detail: "300 g", price: 790 },
        { name: "Jagnjeća džigerica u saftu", detail: "300 g", price: 790 },
        { name: "Dimljena vešalica", detail: "300 g", price: 1450 },
      ],
    },
    {
      title: "Jela po porudžbini",
      image: porudzbinaImg,
      items: [
        { name: "Karađorđeva šnicla", price: 1400 },
        { name: "Bečka šnicla", price: 1200 },
        { name: "Natur šnicla", price: 1300 },
        { name: "Natur šnicla sa pečurkama", price: 1400 },
        { name: "Svinjski medaljoni u sosu", price: 1450 },
        { name: "Biftek", detail: "250 g", price: 3500 },
        { name: "Butkica sa vrganjima i pireom", price: 1400 },
        { name: "Butkica", detail: "1 kg", price: 2000 },
        { name: "Zapečeni ćevapi u sosu od ajvara", price: 1600 },
      ],
    },
    {
      title: "Gotova jela",
      items: [
        { name: "Pasulj sa kobasicom", price: 800 },
        { name: "Juneći gulaš", price: 1000 },
        { name: "Musaka", price: 800 },
        { name: "Paprikaš", price: 800 },
        { name: "Lički ručak", price: 1200 },
        { name: "Sarma", price: 800 },
        { name: "Mućkalica", price: 800 },
        { name: "Prebranac", price: 800 },
        { name: "Lovačka šnicla", price: 850 },
        { name: "Ćufte", price: 800 },
        { name: "Podvarak sa mesom", price: 800 },
      ],
    },
    {
      title: "Posni meni",
      image: posniImg,
      items: [
        { name: "Lignje na žaru", price: 2000 },
        { name: "Pastrmka", detail: "300 g", price: 1800 },
        { name: "Filet soma", price: 1300 },
        { name: "Losos na žaru", price: 2400 },
        { name: "Grilovano povrće", price: 600 },
        { name: "Kuvani krompir", price: 380 },
        { name: "Blitva i krompir", price: 600 },
      ],
    },
    {
      title: "Salate",
      items: [
        { name: "Šopska", price: 430 },
        { name: "Kupus salata", price: 400 },
        { name: "Paradajz salata", price: 480 },
        { name: "Bašta", price: 450 },
        { name: "Pečena paprika", price: 420 },
        { name: "Kiseli kupus", price: 450 },
        { name: "Srpska salata", price: 400 },
        { name: "Moravska salata", price: 480 },
      ],
    },
    {
      title: "Prilozi",
      items: [
        { name: "Ljuta pečena paprika", detail: "kom.", price: 150 },
        { name: "Domaći pomfrit", price: 400 },
        { name: "Pekarski krompir", price: 700 },
        { name: "Riža", price: 360 },
        { name: "Ajvar", price: 500 },
        { name: "Ren", detail: "porcija", price: 400 },
        { name: "Tartar sos", price: 300 },
        { name: "Domaći hleb", detail: "porcija", price: 250 },
      ],
    },
  ],

  pecenje: [
    {
      title: "Pečenje",
      image: pecenjeImg,
      items: [
        { name: "Jagnjeće pečenje", detail: "1 kg", price: 3750 },
        { name: "Praseće pečenje", detail: "1 kg", price: 3250 },
        { name: "Teletina ispod sača", detail: "300 g", price: 1850 },
        { name: "Praseća glava", price: 420 },
        { name: "Jagnjeći zapinjač", detail: "kom.", price: 200 },
        { name: "Jagnjeća glava", price: 220 },
      ],
    },
  ],

  dezerti: [
    {
      title: "Dezerti",
      image: dezertiImg,
      items: [
        { name: "Palačinke u vinskom šatou", detail: "za 2 osobe", price: 1800 },
        { name: "Palačinke sa kremom", price: 480 },
        { name: "Palačinke sa džemom", price: 450 },
        { name: "Palačinke sa prokuvanim orasima", price: 500 },
        { name: "Orasnice", price: 300 },
        { name: "Pita sa jabukama", price: 400 },
        { name: "Pita sa suvim šljivama i orasima", price: 400 },
      ],
    },
  ],

  pica: [
    {
      title: "Topli napici",
      items: [
        { name: "Espresso", price: 240 },
        { name: "Espresso sa mlekom", price: 260 },
        { name: "Espresso sa šlagom", price: 260 },
        { name: "Cappuccino", price: 270 },
        { name: "Ice coffee", price: 420 },
        { name: "Nes coffee", price: 360 },
        { name: "Latte", price: 300 },
        { name: "Domaća kafa sa mlekom", price: 210 },
        { name: "Domaća kafa", price: 190 },
        { name: "Čaj", price: 290 },
      ],
    },
    {
      title: "Vode",
      items: [
        { name: "Soda voda", detail: "1 l", price: 270 },
        { name: "Rosa", detail: "0,33 l", price: 210 },
        { name: "Rosa", detail: "0,75 l", price: 310 },
        { name: "Rosa gazirana", detail: "0,33 l", price: 210 },
        { name: "Rosa gazirana", detail: "0,75 l", price: 310 },
        { name: "Römerquelle limunska trava", price: 270 },
      ],
    },
    {
      title: "Sokovi",
      items: [
        { name: "Coca-Cola", price: 290 },
        { name: "Coca-Cola Zero", price: 290 },
        { name: "Fanta", price: 290 },
        { name: "Sprite", price: 290 },
        { name: "Schweppes bitter lemon", price: 290 },
        { name: "Schweppes tonic", price: 290 },
        { name: "Schweppes tangerine", price: 290 },
        { name: "Red Bull", price: 480 },
        { name: "Orangina", price: 350 },
        { name: "Next jabuka", price: 290 },
        { name: "Next jagoda", price: 290 },
        { name: "Next narandža", price: 290 },
        { name: "Next breskva", price: 290 },
        { name: "Cedevita", price: 300 },
        { name: "Ice Tea", price: 350 },
        { name: "Limunada", price: 350 },
        { name: "Ceđena pomorandža", price: 400 },
      ],
    },
    {
      title: "Pivo",
      items: [
        { name: "Heineken točeno", detail: "0,5 l", price: 450 },
        { name: "Heineken točeno", detail: "0,33 l", price: 370 },
        { name: "Zaječarsko točeno", detail: "0,5 l", price: 350 },
        { name: "Zaječarsko točeno", detail: "0,33 l", price: 270 },
        { name: "Heineken", detail: "0,25 l", price: 420 },
        { name: "Amstel", detail: "0,33 l", price: 350 },
        { name: "Zaječarsko crno", detail: "0,33 l", price: 320 },
        { name: "Birra Moretti", detail: "0,33 l", price: 350 },
      ],
    },
    {
      title: "Rakija",
      note: "0,03 l / 0,05 l",
      image: rakijaImg,
      items: [
        { name: "Šljiva djedova", price: "300 / 390" },
        { name: "Zlatna šljiva", price: "300 / 390" },
        { name: "Zlatna dunja", price: "300 / 390" },
        { name: "Zlatna kajsija", price: "300 / 390" },
        { name: "Loza", price: "260 / 320" },
        { name: "Viljamovka", price: "260 / 360" },
        { name: "Medovača", price: "260 / 350" },
        { name: "Stomaklija", price: "260 / 320" },
        { name: "Lincura", price: "260 / 320" },
        { name: "Klekovača BB", price: "270 / 360" },
      ],
    },
    {
      title: "Žestina",
      note: "0,03 l",
      items: [
        { name: "Jameson", price: 400 },
        { name: "Jack Daniel's", price: 470 },
        { name: "Johnnie Walker Red Label", price: 380 },
        { name: "Johnnie Walker Black Label", price: 540 },
        { name: "Chivas", detail: "12 god.", price: 560 },
        { name: "Smirnoff votka", price: 370 },
        { name: "Campari", price: 400 },
        { name: "Gorki list", price: 260 },
        { name: "Jägermeister", price: 380 },
        { name: "Konjak Courvoisier", price: 580 },
        { name: "Martini Bianco", price: 350 },
        { name: "Beefeater gin", price: 350 },
        { name: "Ballantine's", price: 330 },
      ],
    },
    {
      title: "Vina 1 l",
      items: [
        { name: "Vino kuće belo", price: 1500 },
        { name: "Vino kuće crveno", price: 1500 },
        { name: "Vino kuće rose", price: 1500 },
        { name: "Tikveš smederevka", price: 1500 },
        { name: "Rubin rose", price: 1500 },
      ],
    },
    {
      title: "Vina 0,75 l",
      image: vinaImg,
      items: [
        { name: "Porta Infinitas Sauvignon Blanc", price: 3300 },
        { name: "Luda Mara Temjanika", price: 3300 },
        { name: "Luda Mara Cuvée", price: 3500 },
        { name: "Aleksandrović Trijumf", price: 3800 },
        { name: "Aleksandrović Harizma", price: 3800 },
        { name: "Aleksandrović Regent", price: 4700 },
        { name: "Kovačević Chardonnay", price: 3400 },
        { name: "Kovačević Aurelius", price: 3400 },
        { name: "Radovanović Chardonnay", price: 3400 },
        { name: "Radovanović Cabernet Sauvignon", price: 3400 },
        { name: "Aleksandrović Varijanta", price: 3200 },
        { name: "Erdevik Roza Nostra", price: 3200 },
        { name: "Porta Infinitas Cuvée", price: 3300 },
        { name: "Kamnik Winemakers Selection", price: 4200 },
        { name: "Kamnik Pinot Grigio", price: 4000 },
        { name: "Plantaže belo", detail: "0,187 l", price: 650 },
        { name: "Plantaže Vranac Pro Corde", detail: "0,187 l", price: 750 },
        { name: "Plantaže Vranac", detail: "0,187 l", price: 650 },
      ],
    },
  ],
}

// 1250 → "1.250"
export function formatPrice(price: number | string) {
  return typeof price === "number" ? price.toLocaleString("de-DE") : price
}
