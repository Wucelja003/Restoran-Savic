import { motion } from "motion/react"
import { ease, useEnterDelay } from "../lib/motion"

type PageHeaderProps = {
  eyebrow: string
  title: string
  image: string
  imageClassName?: string
}

export default function PageHeader({ eyebrow, title, image, imageClassName = "" }: PageHeaderProps) {
  const enterDelay = useEnterDelay()

  return (
    <section className="relative flex h-80 items-end overflow-hidden sm:h-96">
      <motion.img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: enterDelay - 0.1, ease }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: enterDelay + 0.1, ease }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
      </motion.div>
    </section>
  )
}
