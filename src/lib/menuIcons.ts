import { Beef, CakeSlice, Salad, Wine, type LucideIcon } from "lucide-react"
import type { MenuCategoryId } from "./menu"

export const menuIcons: Record<MenuCategoryId, LucideIcon> = {
  predjela: Salad,
  "glavna-jela": Beef,
  dezerti: CakeSlice,
  pica: Wine,
}
