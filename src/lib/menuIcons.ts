import { Beef, CakeSlice, Flame, Salad, Wine, type LucideIcon } from "lucide-react"
import type { MenuCategoryId } from "./menu"

export const menuIcons: Record<MenuCategoryId, LucideIcon> = {
  predjela: Salad,
  "glavna-jela": Beef,
  pecenje: Flame,
  dezerti: CakeSlice,
  pica: Wine,
}
