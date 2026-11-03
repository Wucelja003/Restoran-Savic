import predjela from "../assets/menu/predjela.jpg"
import glavnaJela from "../assets/menu/glavna-jela.jpg"
import pecenje from "../assets/pecenje/pecenje-veliko.jpg"
import dezerti from "../assets/menu/dezerti.jpg"
import pica from "../assets/menu/pica.jpg"

// Kategorije jelovnika – koriste ih prečica na početnoj i stranica Meni.
// Stavke svake kategorije su u menuItems.ts
// TODO: slike su privremene (iz foldera swisstransfer_...; dezerti = ROM0956)
export const menuCategories = [
  {
    id: "predjela",
    name: "Predjela",
    tagline: "Hladna i topla predjela – od domaćeg kajmaka do tatar bifteka.",
    image: predjela,
  },
  {
    id: "glavna-jela",
    name: "Glavna jela",
    tagline: "Doručak, čorbe, roštilj, jela po porudžbini, gotova jela, salate i prilozi.",
    image: glavnaJela,
  },
  {
    id: "pecenje",
    name: "Pečenje",
    tagline: "Jagnjeće i praseće pečenje i teletina ispod sača.",
    image: pecenje,
  },
  {
    id: "dezerti",
    name: "Dezerti",
    tagline: "Palačinke, domaće pite i orasnice.",
    image: dezerti,
  },
  {
    id: "pica",
    name: "Pića",
    tagline: "Kafa, sokovi, pivo, domaće rakije, žestina i vina.",
    image: pica,
  },
] as const

export type MenuCategoryId = (typeof menuCategories)[number]["id"]
