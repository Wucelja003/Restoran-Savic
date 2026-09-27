import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

type PreviewVideoProps = {
  src: string
  poster?: string
  // npr. dok je otvoren veliki video
  paused?: boolean
  className?: string
}

// Nemi video u petlji koji se pušta samo dok je na ekranu (štedi procesor i bateriju)
export default function PreviewVideo({ src, poster, paused = false, className }: PreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView && !paused) {
      v.muted = true
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, paused])

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" className={className} />
}
