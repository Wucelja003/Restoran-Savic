import { motion } from "motion/react"
import { ease } from "../lib/motion"

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Sadržaj se lagano podigne i pojavi kad uđe u vidno polje
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
