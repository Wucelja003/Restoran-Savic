import { useState } from "react"

export const ease = [0.22, 1, 0.36, 1] as const

const INTRO_KEY = "savic-intro"

// Uvodna animacija se pušta samo jednom po poseti (sesiji)
export const playIntro = (() => {
  try {
    return !sessionStorage.getItem(INTRO_KEY)
  } catch {
    return true
  }
})()

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1")
  } catch {
    // sessionStorage nije dostupan – intro će se pustiti ponovo, nije problem
  }
}

// Koliko dugo intro drži ekran pre nego što se zavesa podigne (ms)
export const INTRO_HOLD = 1800

const loadedAt = performance.now()

// Kašnjenje (s) za animacije ulaska: dok traje intro čekamo da se zavesa podigne,
// a posle toga (npr. prelazak na drugu stranicu) animacije kreću odmah
export function getEnterDelay() {
  if (!playIntro) return 0.1
  const elapsed = (performance.now() - loadedAt) / 1000
  return Math.max(0.1, INTRO_HOLD / 1000 + 0.2 - elapsed)
}

// Kašnjenje se "zamrzne" pri prvom renderu komponente
export function useEnterDelay() {
  return useState(getEnterDelay)[0]
}
