import { useEffect, useState, type ReactNode } from "react"
import { LangContext, type Lang } from "./lang"

const KEY = "savic-lang"

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "sr" || saved === "en") return saved
  } catch {
    // localStorage nije dostupan – ostaje srpski
  }
  return "sr"
}

// Jezik sajta za celu aplikaciju; izbor se pamti u browseru
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      // nije bitno ako ne uspe
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "sr"
    document.title = lang === "en" ? "Restaurant Savić" : "Restoran Savić"
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
