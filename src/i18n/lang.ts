import { createContext, useContext } from "react"

export type Lang = "sr" | "en"
// Tekst na oba jezika – koristi se u podacima (meni, usluge…)
export type Text = { sr: string; en: string }

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "sr",
  setLang: () => {},
})

export function useLang() {
  return useContext(LangContext)
}

// const t = useT();  t("Rezerviši sto", "Book a table")
export function useT() {
  const { lang } = useLang()
  return (sr: string, en: string) => (lang === "en" ? en : sr)
}

// Za podatke: pick(text) → tekst na trenutnom jeziku
export function usePick() {
  const { lang } = useLang()
  return (text: Text) => text[lang]
}
