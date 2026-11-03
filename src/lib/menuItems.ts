import type { MenuCategoryId } from "./menu"
import type { Text } from "../i18n/lang"
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
// en: naziv na engleskom (ako je isti kao srpski, npr. "Espresso", ne mora)
export type MenuItem = { name: string; en?: string; detail?: string; price: number | string }
export type MenuGroup = { title: Text; note?: string; image?: string; items: MenuItem[] }

export const menuItems: Record<MenuCategoryId, MenuGroup[]> = {
  predjela: [
    {
      title: { sr: "Hladna predjela", en: "Cold Starters" },
      image: hladnaImg,
      items: [
        { name: "Predjelo Savić", en: "Savić Starter Platter", detail: "400 g", price: 2000 },
        { name: "Pršut", en: "Pršut – dry-cured ham", detail: "100 g", price: 1100 },
        { name: "Domaći kajmak", en: "Homemade Kajmak – clotted cream", detail: "150 g", price: 780 },
        { name: "Paprika u pavlaci", en: "Peppers in Sour Cream", detail: "250 g", price: 680 },
        { name: "Kulen", en: "Kulen – spicy cured sausage", detail: "100 g", price: 800 },
        { name: "Sjenički sir", en: "Sjenica White Cheese", detail: "200 g", price: 720 },
        { name: "Pančeta", en: "Pancetta", detail: "100 g", price: 800 },
        { name: "Pihtije", en: "Pihtije – pork aspic", price: 750 },
        { name: "Tatar biftek", en: "Steak Tartare", detail: "250 g", price: 4000 },
      ],
    },
    {
      title: { sr: "Topla predjela", en: "Hot Starters" },
      image: toplaImg,
      items: [
        { name: "Pohovani kačkavalj", en: "Breaded Kashkaval Cheese", detail: "200 g", price: 650 },
        { name: "Pečurke na žaru", en: "Grilled Mushrooms", detail: "200 g", price: 550 },
        { name: "Pohovane punjene paprike", en: "Breaded Stuffed Peppers", price: 900 },
        { name: "Suve šljive u slanini", en: "Bacon-Wrapped Prunes", price: 600 },
      ],
    },
  ],

  "glavna-jela": [
    {
      title: { sr: "Doručak", en: "Breakfast" },
      items: [
        { name: "Omlet sa slaninom i sirom", en: "Bacon & Cheese Omelette", price: 600 },
        { name: "Omlet sa šunkom i sirom", en: "Ham & Cheese Omelette", price: 600 },
        { name: "Omlet sa pršutom", en: "Pršut Omelette", price: 680 },
        { name: "Prženice sa pršutom i kajmakom", en: "French Toast with Pršut & Kajmak", price: 700 },
        { name: "Komplet lepinja", en: "Komplet Lepinja – flatbread with kajmak, egg & roast drippings", price: 600 },
        { name: "Gibanica", en: "Gibanica – cheese filo pie", price: 650 },
        { name: "Kačamak", en: "Kačamak – cornmeal porridge", price: 400 },
        { name: "Cicvara", en: "Cicvara – creamy cheese & cornmeal", price: 500 },
        { name: "Uštipci od testa", en: "Fried Dough Puffs", price: 500 },
      ],
    },
    {
      title: { sr: "Supe i čorbe", en: "Soups" },
      items: [
        { name: "Teleća čorba", en: "Veal Soup", price: 450 },
        { name: "Jagnjeća čorba", en: "Lamb Soup", price: 450 },
        { name: "Domaća supa sa rezancima", en: "Homemade Noodle Soup", price: 400 },
      ],
    },
    {
      title: { sr: "Roštilj", en: "From the Grill" },
      image: rostiljImg,
      items: [
        { name: "Bela vešalica", en: "Grilled Pork Loin", detail: "300 g", price: 1250 },
        { name: "Punjena bela vešalica", en: "Stuffed Pork Loin", detail: "400 g", price: 1520 },
        { name: "Medaljoni na žaru", en: "Grilled Medallions", detail: "300 g", price: 1350 },
        { name: "Rolovani pileći file", en: "Rolled Chicken Fillet", price: 1350 },
        { name: "Ćevapi Savić", en: "Savić Ćevapi – grilled minced-meat rolls", detail: "300 g", price: 1300 },
        { name: "Pljeskavica", en: "Pljeskavica – Serbian grilled patty", detail: "300 g", price: 1250 },
        { name: "Gurmanska pljeskavica", en: "Gourmet Pljeskavica – stuffed patty", detail: "350 g", price: 1350 },
        { name: "Savić uštipci", en: "Savić Uštipci – stuffed meat patties", detail: "300 g", price: 1250 },
        { name: "Ražnjići", en: "Pork Skewers", detail: "300 g", price: 1190 },
        { name: "Mešano meso", en: "Mixed Grill", detail: "500 g", price: 2200 },
        { name: "Domaće kobasice", en: "Homemade Sausages", price: 1190 },
        { name: "Jagnjeća džigerica na žaru", en: "Grilled Lamb Liver", detail: "300 g", price: 790 },
        { name: "Jagnjeća džigerica u saftu", en: "Lamb Liver in Gravy", detail: "300 g", price: 790 },
        { name: "Dimljena vešalica", en: "Smoked Pork Loin", detail: "300 g", price: 1450 },
      ],
    },
    {
      title: { sr: "Jela po porudžbini", en: "Made to Order" },
      image: porudzbinaImg,
      items: [
        { name: "Karađorđeva šnicla", en: "Karađorđe Schnitzel – rolled, breaded and filled with kajmak", price: 1400 },
        { name: "Bečka šnicla", en: "Wiener Schnitzel", price: 1200 },
        { name: "Natur šnicla", en: "Pan-Fried Pork Schnitzel", price: 1300 },
        { name: "Natur šnicla sa pečurkama", en: "Pan-Fried Schnitzel with Mushrooms", price: 1400 },
        { name: "Svinjski medaljoni u sosu", en: "Pork Medallions in Sauce", price: 1450 },
        { name: "Biftek", en: "Beef Tenderloin Steak", detail: "250 g", price: 3500 },
        { name: "Butkica sa vrganjima i pireom", en: "Pork Shank with Porcini & Mash", price: 1400 },
        { name: "Butkica", en: "Pork Shank", detail: "1 kg", price: 2000 },
        { name: "Zapečeni ćevapi u sosu od ajvara", en: "Ćevapi Baked in Ajvar Sauce", price: 1600 },
      ],
    },
    {
      title: { sr: "Gotova jela", en: "Home-Style Classics" },
      items: [
        { name: "Pasulj sa kobasicom", en: "Bean Stew with Sausage", price: 800 },
        { name: "Juneći gulaš", en: "Beef Goulash", price: 1000 },
        { name: "Musaka", en: "Moussaka", price: 800 },
        { name: "Paprikaš", en: "Paprikash", price: 800 },
        { name: "Lički ručak", en: "Lika-Style Lunch", price: 1200 },
        { name: "Sarma", en: "Sarma – stuffed cabbage rolls", price: 800 },
        { name: "Mućkalica", en: "Mućkalica – grilled meat & pepper stew", price: 800 },
        { name: "Prebranac", en: "Prebranac – baked beans", price: 800 },
        { name: "Lovačka šnicla", en: "Hunter's Schnitzel", price: 850 },
        { name: "Ćufte", en: "Meatballs in Tomato Sauce", price: 800 },
        { name: "Podvarak sa mesom", en: "Podvarak – sauerkraut with roast meat", price: 800 },
      ],
    },
    {
      title: { sr: "Posni meni", en: "Lenten Menu" },
      image: posniImg,
      items: [
        { name: "Lignje na žaru", en: "Grilled Squid", price: 2000 },
        { name: "Pastrmka", en: "Trout", detail: "300 g", price: 1800 },
        { name: "Filet soma", en: "Catfish Fillet", price: 1300 },
        { name: "Losos na žaru", en: "Grilled Salmon", price: 2400 },
        { name: "Grilovano povrće", en: "Grilled Vegetables", price: 600 },
        { name: "Kuvani krompir", en: "Boiled Potatoes", price: 380 },
        { name: "Blitva i krompir", en: "Swiss Chard with Potatoes", price: 600 },
      ],
    },
    {
      title: { sr: "Salate", en: "Salads" },
      items: [
        { name: "Šopska", en: "Shopska Salad", price: 430 },
        { name: "Kupus salata", en: "Cabbage Salad", price: 400 },
        { name: "Paradajz salata", en: "Tomato Salad", price: 480 },
        { name: "Bašta", en: "Garden Salad", price: 450 },
        { name: "Pečena paprika", en: "Roasted Peppers", price: 420 },
        { name: "Kiseli kupus", en: "Sauerkraut", price: 450 },
        { name: "Srpska salata", en: "Serbian Salad", price: 400 },
        { name: "Moravska salata", en: "Morava Salad", price: 480 },
      ],
    },
    {
      title: { sr: "Prilozi", en: "Sides" },
      items: [
        { name: "Ljuta pečena paprika", en: "Roasted Hot Pepper", detail: "kom.", price: 150 },
        { name: "Domaći pomfrit", en: "Homemade Fries", price: 400 },
        { name: "Pekarski krompir", en: "Roast Potatoes with Onion", price: 700 },
        { name: "Riža", en: "Rice", price: 360 },
        { name: "Ajvar", en: "Ajvar – roasted pepper relish", price: 500 },
        { name: "Ren", en: "Horseradish", detail: "porcija", price: 400 },
        { name: "Tartar sos", en: "Tartar Sauce", price: 300 },
        { name: "Domaći hleb", en: "Homemade Bread", detail: "porcija", price: 250 },
      ],
    },
  ],

  pecenje: [
    {
      title: { sr: "Pečenje", en: "Spit Roasts" },
      image: pecenjeImg,
      items: [
        { name: "Jagnjeće pečenje", en: "Spit-Roasted Lamb", detail: "1 kg", price: 3750 },
        { name: "Praseće pečenje", en: "Spit-Roasted Suckling Pig", detail: "1 kg", price: 3250 },
        { name: "Teletina ispod sača", en: "Veal Baked under the Sač", detail: "300 g", price: 1850 },
        { name: "Praseća glava", en: "Roasted Pig's Head", price: 420 },
        { name: "Jagnjeći zapinjač", en: "Lamb Zapinjač", detail: "kom.", price: 200 },
        { name: "Jagnjeća glava", en: "Roasted Lamb's Head", price: 220 },
      ],
    },
  ],

  dezerti: [
    {
      title: { sr: "Dezerti", en: "Desserts" },
      image: dezertiImg,
      items: [
        { name: "Palačinke u vinskom šatou", en: "Crêpes in Wine Sabayon", detail: "za 2 osobe", price: 1800 },
        { name: "Palačinke sa kremom", en: "Crêpes with Chocolate Cream", price: 480 },
        { name: "Palačinke sa džemom", en: "Crêpes with Jam", price: 450 },
        { name: "Palačinke sa prokuvanim orasima", en: "Crêpes with Sweet Walnuts", price: 500 },
        { name: "Orasnice", en: "Orasnice – walnut cookies", price: 300 },
        { name: "Pita sa jabukama", en: "Apple Pie", price: 400 },
        { name: "Pita sa suvim šljivama i orasima", en: "Prune & Walnut Pie", price: 400 },
      ],
    },
  ],

  pica: [
    {
      title: { sr: "Topli napici", en: "Hot Drinks" },
      items: [
        { name: "Espresso", price: 240 },
        { name: "Espresso sa mlekom", en: "Espresso with Milk", price: 260 },
        { name: "Espresso sa šlagom", en: "Espresso with Whipped Cream", price: 260 },
        { name: "Cappuccino", price: 270 },
        { name: "Ice coffee", en: "Iced Coffee", price: 420 },
        { name: "Nes coffee", en: "Nescafé", price: 360 },
        { name: "Latte", price: 300 },
        { name: "Domaća kafa sa mlekom", en: "Serbian Coffee with Milk", price: 210 },
        { name: "Domaća kafa", en: "Serbian Coffee", price: 190 },
        { name: "Čaj", en: "Tea", price: 290 },
      ],
    },
    {
      title: { sr: "Vode", en: "Water" },
      items: [
        { name: "Soda voda", en: "Soda Water", detail: "1 l", price: 270 },
        { name: "Rosa", en: "Rosa Still Water", detail: "0,33 l", price: 210 },
        { name: "Rosa", en: "Rosa Still Water", detail: "0,75 l", price: 310 },
        { name: "Rosa gazirana", en: "Rosa Sparkling Water", detail: "0,33 l", price: 210 },
        { name: "Rosa gazirana", en: "Rosa Sparkling Water", detail: "0,75 l", price: 310 },
        { name: "Römerquelle limunska trava", en: "Römerquelle Lemongrass", price: 270 },
      ],
    },
    {
      title: { sr: "Sokovi", en: "Soft Drinks & Juices" },
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
        { name: "Next jabuka", en: "Next Apple", price: 290 },
        { name: "Next jagoda", en: "Next Strawberry", price: 290 },
        { name: "Next narandža", en: "Next Orange", price: 290 },
        { name: "Next breskva", en: "Next Peach", price: 290 },
        { name: "Cedevita", price: 300 },
        { name: "Ice Tea", price: 350 },
        { name: "Limunada", en: "Lemonade", price: 350 },
        { name: "Ceđena pomorandža", en: "Freshly Squeezed Orange Juice", price: 400 },
      ],
    },
    {
      title: { sr: "Pivo", en: "Beer" },
      items: [
        { name: "Heineken točeno", en: "Heineken Draught", detail: "0,5 l", price: 450 },
        { name: "Heineken točeno", en: "Heineken Draught", detail: "0,33 l", price: 370 },
        { name: "Zaječarsko točeno", en: "Zaječarsko Draught", detail: "0,5 l", price: 350 },
        { name: "Zaječarsko točeno", en: "Zaječarsko Draught", detail: "0,33 l", price: 270 },
        { name: "Heineken", detail: "0,25 l", price: 420 },
        { name: "Amstel", detail: "0,33 l", price: 350 },
        { name: "Zaječarsko crno", en: "Zaječarsko Dark", detail: "0,33 l", price: 320 },
        { name: "Birra Moretti", detail: "0,33 l", price: 350 },
      ],
    },
    {
      title: { sr: "Rakija", en: "Rakija – Serbian Fruit Brandy" },
      note: "0,03 l / 0,05 l",
      image: rakijaImg,
      items: [
        { name: "Šljiva djedova", en: "Šljiva Djedova – plum", price: "300 / 390" },
        { name: "Zlatna šljiva", en: "Zlatna – plum", price: "300 / 390" },
        { name: "Zlatna dunja", en: "Zlatna – quince", price: "300 / 390" },
        { name: "Zlatna kajsija", en: "Zlatna – apricot", price: "300 / 390" },
        { name: "Loza", en: "Loza – grape", price: "260 / 320" },
        { name: "Viljamovka", en: "Viljamovka – Williams pear", price: "260 / 360" },
        { name: "Medovača", en: "Medovača – honey", price: "260 / 350" },
        { name: "Stomaklija", en: "Stomaklija – herbal bitter", price: "260 / 320" },
        { name: "Lincura", en: "Lincura – gentian", price: "260 / 320" },
        { name: "Klekovača BB", en: "Klekovača BB – juniper", price: "270 / 360" },
      ],
    },
    {
      title: { sr: "Žestina", en: "Spirits" },
      note: "0,03 l",
      items: [
        { name: "Jameson", price: 400 },
        { name: "Jack Daniel's", price: 470 },
        { name: "Johnnie Walker Red Label", price: 380 },
        { name: "Johnnie Walker Black Label", price: 540 },
        { name: "Chivas", detail: "12 god.", price: 560 },
        { name: "Smirnoff votka", en: "Smirnoff Vodka", price: 370 },
        { name: "Campari", price: 400 },
        { name: "Gorki list", en: "Gorki List – herbal liqueur", price: 260 },
        { name: "Jägermeister", price: 380 },
        { name: "Konjak Courvoisier", en: "Courvoisier Cognac", price: 580 },
        { name: "Martini Bianco", price: 350 },
        { name: "Beefeater gin", en: "Beefeater Gin", price: 350 },
        { name: "Ballantine's", price: 330 },
      ],
    },
    {
      title: { sr: "Vina 1 l", en: "House Wine by the Litre" },
      items: [
        { name: "Vino kuće belo", en: "House White", price: 1500 },
        { name: "Vino kuće crveno", en: "House Red", price: 1500 },
        { name: "Vino kuće rose", en: "House Rosé", price: 1500 },
        { name: "Tikveš smederevka", en: "Tikveš Smederevka", price: 1500 },
        { name: "Rubin rose", en: "Rubin Rosé", price: 1500 },
      ],
    },
    {
      title: { sr: "Vina 0,75 l", en: "Bottled Wine (0.75 l)" },
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
        { name: "Plantaže belo", en: "Plantaže White", detail: "0,187 l", price: 650 },
        { name: "Plantaže Vranac Pro Corde", detail: "0,187 l", price: 750 },
        { name: "Plantaže Vranac", detail: "0,187 l", price: 650 },
      ],
    },
  ],
}

// 1250 → "1.250" (srpski) / "1,250" (engleski)
export function formatPrice(price: number | string, lang: "sr" | "en" = "sr") {
  return typeof price === "number" ? price.toLocaleString(lang === "en" ? "en-US" : "de-DE") : price
}
