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
    name: { sr: "Predjela", en: "Starters" },
    tagline: {
      sr: "Hladna i topla predjela – od domaćeg kajmaka do tatar bifteka.",
      en: "Cold and hot starters – from homemade kajmak to steak tartare.",
    },
    image: predjela,
  },
  {
    id: "glavna-jela",
    name: { sr: "Glavna jela", en: "Main Courses" },
    tagline: {
      sr: "Doručak, čorbe, roštilj, jela po porudžbini, gotova jela, salate i prilozi.",
      en: "Breakfast, soups, grill, dishes made to order, home-style classics, salads and sides.",
    },
    image: glavnaJela,
  },
  {
    id: "pecenje",
    name: { sr: "Pečenje", en: "Spit Roasts" },
    tagline: {
      sr: "Jagnjeće i praseće pečenje i teletina ispod sača.",
      en: "Spit-roasted lamb and suckling pig, and veal slow-baked under the sač.",
    },
    image: pecenje,
  },
  {
    id: "dezerti",
    name: { sr: "Dezerti", en: "Desserts" },
    tagline: { sr: "Palačinke, domaće pite i orasnice.", en: "Crêpes, homemade pies and walnut cookies." },
    image: dezerti,
  },
  {
    id: "pica",
    name: { sr: "Pića", en: "Drinks" },
    tagline: { sr: "Kafa, sokovi, pivo, domaće rakije, žestina i vina.", en: "Coffee, soft drinks, beer, Serbian rakija, spirits and wine." },
    image: pica,
  },
] as const

export type MenuCategoryId = (typeof menuCategories)[number]["id"]
