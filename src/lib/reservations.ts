import { ChefHat, PartyPopper, UtensilsCrossed, type LucideIcon } from "lucide-react"
import stoImg from "../assets/ambijent/ambijent-4.jpg"
import proslaveImg from "../assets/pecenje/sto.jpg"
import keteringImg from "../assets/pecenje/pecenje-veliko.jpg"
import type { Text } from "../i18n/lang"

// Usluge rezervacije – koriste ih stranica Rezervacija i sekcija "Rezervišite kod nas"

export type ServiceId = "sto" | "proslave" | "ketering"

export type Service = {
  id: ServiceId
  icon: LucideIcon
  title: Text
  short: Text
  image: string
  heading: Text
  description: Text
  features: Text[]
  // podnaslov za kartice u sekciji "Rezervišite kod nas"
  subtitle: Text
}

// TODO: proveriti tekstove i ponudu sa vlasnikom
export const services: Service[] = [
  {
    id: "sto",
    icon: UtensilsCrossed,
    title: { sr: "Rezervacija stola", en: "Table Reservation" },
    short: { sr: "Ručak ili večera za vas i vaše društvo.", en: "Lunch or dinner for you and your company." },
    image: stoImg,
    heading: { sr: "Vaš sto vas čeka", en: "Your table is waiting" },
    description: {
      sr: "Rezervišite sto za porodični ručak, večeru u dvoje ili izlazak sa prijateljima. Javićemo vam se da potvrdimo rezervaciju.",
      en: "Book a table for a family lunch, a dinner for two or a night out with friends. We will get in touch to confirm your booking.",
    },
    features: [
      { sr: "Potvrda rezervacije telefonom", en: "Booking confirmed by phone" },
      { sr: "Mesto u sali ili u mirnijem delu restorana", en: "A seat in the main room or a quieter corner" },
      { sr: "Posebne želje – torta, dekoracija, dečja stolica", en: "Special requests – a cake, decorations, a high chair" },
    ],
    subtitle: {
      sr: "Sačuvaćemo vam najbolje mesto – za ručak u dvoje, porodičnu večeru ili izlazak sa prijateljima.",
      en: "We will save you the best seat in the house – for lunch for two, a family dinner or a night out with friends.",
    },
  },
  {
    id: "proslave",
    icon: PartyPopper,
    title: { sr: "Sala za proslave", en: "Celebration Hall" },
    short: { sr: "Slave, rođendani, venčanja i poslovne proslave.", en: "Family feasts, birthdays, weddings and corporate events." },
    image: proslaveImg,
    heading: { sr: "Proslavite kod nas", en: "Celebrate with us" },
    description: {
      sr: "Sala za vaše posebne trenutke – od porodične slave do velikog slavlja. Meni i organizaciju prilagođavamo vama.",
      en: "A hall for your special moments – from an intimate family gathering to a grand celebration. We tailor the menu and the arrangements to you.",
    },
    features: [
      { sr: "Sala za veća društva", en: "A hall for larger parties" },
      { sr: "Meni po dogovoru – pečenje, roštilj i specijaliteti kuće", en: "A bespoke menu – spit roasts, grilled meats and house specialties" },
      { sr: "Pomoć oko organizacije i dekoracije", en: "Help with planning and decorations" },
    ],
    subtitle: {
      sr: "Slave, rođendani i venčanja uz pečenje, punu trpezu i toplinu kakvu ćete dugo pamtiti.",
      en: "Family feasts, birthdays and weddings with spit roasts, a generous table and a warmth you will long remember.",
    },
  },
  {
    id: "ketering",
    icon: ChefHat,
    title: { sr: "Ketering", en: "Catering" },
    short: { sr: "Naša kuhinja na vašem događaju.", en: "Our kitchen at your event." },
    image: keteringImg,
    heading: { sr: "Ukus Savića, gde god da ste", en: "The taste of Savić, wherever you are" },
    description: {
      sr: "Pečenje, roštilj i domaći specijaliteti – spremljeni u našoj kuhinji i dostavljeni na vaše slavlje ili poslovni događaj.",
      en: "Spit roasts, grilled meats and home-style specialties – prepared in our kitchen and delivered to your celebration or business event.",
    },
    features: [
      { sr: "Pečenje, roštilj i hladna predjela", en: "Spit roasts, grilled meats and cold starters" },
      { sr: "Dostava i serviranje po dogovoru", en: "Delivery and service on request" },
      { sr: "Za porodična i poslovna okupljanja", en: "For family and business gatherings" },
    ],
    subtitle: {
      sr: "Ukus Savića na vašem slavlju – pečenje i domaći specijaliteti, spremljeni u našoj kuhinji.",
      en: "The taste of Savić at your celebration – spit roasts and home-style specialties, prepared in our kitchen.",
    },
  },
]
