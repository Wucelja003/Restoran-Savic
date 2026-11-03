import Button from "../components/Button"
import { useT } from "../i18n/lang"

export default function NotFound() {
  const t = useT()
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-7xl text-gold">404</p>
      <h1 className="mt-4 text-2xl">{t("Stranica ne postoji", "Page not found")}</h1>
      <div className="mt-10">
        <Button to="/">{t("Nazad na početnu", "Back to home")}</Button>
      </div>
    </section>
  )
}
