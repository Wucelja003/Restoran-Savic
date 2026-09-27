import PageHeader from "../components/PageHeader"
import headerImg from "../assets/images/restoran-5.jpg"

export default function Reservation() {
  return (
    <>
      <PageHeader eyebrow="Očekujemo vas" title="Rezervacija" image={headerImg} />
      <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <p className="text-neutral-400">Forma za rezervaciju uskoro.</p>
      </section>
    </>
  )
}
