import Button from "../components/Button"

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-7xl text-gold">404</p>
      <h1 className="mt-4 text-2xl">Stranica ne postoji</h1>
      <div className="mt-10">
        <Button to="/">Nazad na početnu</Button>
      </div>
    </section>
  )
}
