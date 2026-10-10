import predjela from "../assets/menu/predjela.jpg"
import glavnaJela from "../assets/menu/glavna-jela.jpg"
import dezerti from "../assets/menu/dezerti.jpg"
import pica from "../assets/menu/pica.jpg"

// Kategorije jelovnika – koriste ih prečica na početnoj i stranica Meni.
// TODO: slike su privremene (iz foldera swisstransfer_...; dezerti = ROM0956), tekstovi takođe
export const menuCategories = [
  {
    id: "predjela",
    name: "Predjela",
    tagline: "Hladna i topla predjela za lagan početak.",
    image: predjela,
  },
  {
    id: "glavna-jela",
    name: "Glavna jela",
    tagline: "Roštilj, jela sa žara i domaći specijaliteti.",
    image: glavnaJela,
  },
  {
    id: "dezerti",
    name: "Dezerti",
    tagline: "Domaće pite, štrudle i slatki završetak.",
    image: dezerti,
  },
  {
    id: "pica",
    name: "Pića",
    tagline: "Domaće rakije, vina i osvežavajuća pića.",
    image: pica,
  },
] as const

export type MenuCategoryId = (typeof menuCategories)[number]["id"]
