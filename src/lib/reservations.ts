import { ChefHat, PartyPopper, UtensilsCrossed, type LucideIcon } from "lucide-react"
import stoImg from "../assets/ambijent/ambijent-4.jpg"
import proslaveImg from "../assets/pecenje/sto.jpg"
import keteringImg from "../assets/pecenje/pecenje-veliko.jpg"

// Usluge rezervacije – koriste ih stranica Rezervacija i sekcija "Rezervišite kod nas"

export type ServiceId = "sto" | "proslave" | "ketering"

export type Service = {
  id: ServiceId
  icon: LucideIcon
  title: string
  short: string
  image: string
  heading: string
  description: string
  features: string[]
  // podnaslov za kartice u sekciji "Rezervišite kod nas"
  subtitle: string
}

// TODO: proveriti tekstove i ponudu sa vlasnikom
export const services: Service[] = [
  {
    id: "sto",
    icon: UtensilsCrossed,
    title: "Rezervacija stola",
    short: "Ručak ili večera za vas i vaše društvo.",
    image: stoImg,
    heading: "Vaš sto vas čeka",
    description: "Rezervišite sto za porodični ručak, večeru u dvoje ili izlazak sa prijateljima. Javićemo vam se da potvrdimo rezervaciju.",
    features: ["Potvrda rezervacije telefonom", "Mesto u sali ili u mirnijem delu restorana", "Posebne želje – torta, dekoracija, dečja stolica"],
    subtitle: "Sačuvaćemo vam najbolje mesto – za ručak u dvoje, porodičnu večeru ili izlazak sa prijateljima.",
  },
  {
    id: "proslave",
    icon: PartyPopper,
    title: "Sala za proslave",
    short: "Slave, rođendani, venčanja i poslovne proslave.",
    image: proslaveImg,
    heading: "Proslavite kod nas",
    description: "Sala za vaše posebne trenutke – od porodične slave do velikog slavlja. Meni i organizaciju prilagođavamo vama.",
    features: ["Sala za veća društva", "Meni po dogovoru – pečenje, roštilj i specijaliteti kuće", "Pomoć oko organizacije i dekoracije"],
    subtitle: "Slave, rođendani i venčanja uz pečenje, punu trpezu i toplinu kakvu ćete dugo pamtiti.",
  },
  {
    id: "ketering",
    icon: ChefHat,
    title: "Ketering",
    short: "Naša kuhinja na vašem događaju.",
    image: keteringImg,
    heading: "Ukus Savića, gde god da ste",
    description: "Pečenje, roštilj i domaći specijaliteti – spremljeni u našoj kuhinji i dostavljeni na vaše slavlje ili poslovni događaj.",
    features: ["Pečenje, roštilj i hladna predjela", "Dostava i serviranje po dogovoru", "Za porodična i poslovna okupljanja"],
    subtitle: "Ukus Savića na vašem slavlju – pečenje i domaći specijaliteti, spremljeni u našoj kuhinji.",
  },
]
