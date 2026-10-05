import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { motion, type PanInfo, type Transition } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface SkewedCarouselItem {
  /** Image source */
  src: string
  /** Caption rendered over the focused slide */
  title: string
  /** Alt text, defaults to the title */
  alt?: string
}

export interface SkewedCarouselProps {
  /** Slides rendered by the carousel */
  items: SkewedCarouselItem[]
  /** Slide focused on mount */
  initialIndex?: number
  /** Slide width in pixels */
  cardWidth?: number
  /** Aspect ratio of each slide */
  aspectRatio?: string
  /** Degrees each slide turns per step away from the focused one */
  rotation?: number
  /** Scale applied to every unfocused slide */
  inactiveScale?: number
  /** Perspective depth applied to each slide in pixels */
  perspective?: number
  /** Corner radius of the slides in pixels */
  borderRadius?: number
  /** Blur applied to unfocused captions in pixels */
  titleBlur?: number
  /** Multiplier for the transition duration */
  speed?: number
  /** Render the caption over the focused slide */
  showTitles?: boolean
  /** Show the previous and next buttons */
  showControls?: boolean
  /** Show the segmented progress rail */
  showDots?: boolean
  /** Wrap around at either end */
  loop?: boolean
  /** Advance on a timer */
  autoplay?: boolean
  /** Delay between automatic advances in milliseconds */
  autoplayDelay?: number
  /** Allow dragging across the strip to navigate */
  enableDrag?: boolean
  /** Allow arrow keys to navigate when focused */
  enableKeyboard?: boolean
  /** Additional CSS classes */
  className?: string
  /** Fired whenever the focused slide changes */
  onIndexChange?: (index: number) => void
}

const FLICK_DISTANCE = 45
const FLICK_WEIGHT = 0.08

const settle = (value: number, count: number, wrap: boolean) => {
  if (count < 1) return 0
  if (wrap) return ((value % count) + count) % count
  return value < 0 ? 0 : value > count - 1 ? count - 1 : value
}

const spring = (bounce: number, seconds: number, speed: number): Transition => ({
  type: "spring",
  bounce,
  duration: seconds * speed,
})

interface SlideProps {
  item: SkewedCarouselItem
  offset: number
  focused: boolean
  width: number
  aspectRatio: string
  rotation: number
  scale: number
  perspective: number
  radius: number
  blur: number
  captioned: boolean
  transition: Transition
  onPick: () => void
}

const Slide = ({
  item,
  offset,
  focused,
  width,
  aspectRatio,
  rotation,
  scale,
  perspective,
  radius,
  blur,
  captioned,
  transition,
  onPick,
}: SlideProps) => (
  <div style={{ perspective }}>
    <motion.div
      className="will-change-[transform,scale]"
      style={{ width, aspectRatio }}
      animate={{ rotateY: offset * -rotation, scale: focused ? 1 : scale }}
      transition={transition}
    >
      <button
        type="button"
        onClick={onPick}
        tabIndex={focused ? 0 : -1}
        aria-label={item.title}
        aria-current={focused}
        style={{ borderRadius: radius }}
        className={`relative block h-full w-full cursor-pointer overflow-hidden border bg-transparent p-0 outline-none transition-[border-color,box-shadow] duration-500 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:[outline-offset:4px] ${
          focused ? "border-gold/50 shadow-[0_30px_80px_rgba(238,191,28,0.18)]" : "border-white/10"
        }`}
      >
        <img src={item.src} alt={item.alt ?? item.title} draggable={false} className="h-full w-full object-cover" />

        {captioned && (
          <>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              animate={{ opacity: focused ? 1 : 0 }}
              transition={transition}
            />
            <motion.span
              aria-hidden={!focused}
              className="pointer-events-none absolute inset-x-0 bottom-0 block px-5 pb-5 text-left font-serif text-xl leading-snug text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.35)] sm:text-2xl"
              animate={{
                opacity: focused ? 1 : 0,
                filter: `blur(${focused ? 0 : blur}px)`,
                y: focused ? 0 : 10,
              }}
              transition={transition}
            >
              {item.title}
            </motion.span>
          </>
        )}
      </button>
    </motion.div>
  </div>
)

interface RailProps {
  items: SkewedCarouselItem[]
  current: number
  token: string
  transition: Transition
  onPick: (index: number) => void
}

const Rail = ({ items, current, token, transition, onPick }: RailProps) => (
  <div className="flex w-44 items-center gap-1.5 sm:w-64">
    {items.map((item, index) => (
      <button
        key={`rail-${item.src}-${index}`}
        type="button"
        onClick={() => onPick(index)}
        aria-label={`Prikaži: ${item.title}`}
        aria-current={index === current}
        className="relative h-0.5 flex-1 cursor-pointer rounded-full bg-white/15 transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-[''] hover:bg-white/40"
      >
        {index === current && (
          <motion.span layoutId={token} className="absolute inset-0 rounded-full bg-gold" transition={transition} />
        )}
      </button>
    ))}
  </div>
)

const Arrow = ({ side, disabled, onPress }: { side: "prev" | "next"; disabled: boolean; onPress: () => void }) => {
  const Glyph = side === "prev" ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      aria-label={side === "prev" ? "Prethodno" : "Sledeće"}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:bg-gold hover:text-ink disabled:pointer-events-none disabled:opacity-20"
    >
      <Glyph size={18} strokeWidth={2.25} />
    </button>
  )
}

const SkewedCarousel: React.FC<SkewedCarouselProps> = ({
  items,
  initialIndex = 3,
  cardWidth = 200,
  aspectRatio = "3 / 4",
  rotation = 60,
  inactiveScale = 0.85,
  perspective = 800,
  borderRadius = 8,
  titleBlur = 2,
  speed = 1,
  showTitles = true,
  showControls = true,
  showDots = true,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  enableDrag = true,
  enableKeyboard = true,
  className = "",
  onIndexChange,
}) => {
  const count = items.length
  const token = useId()
  const [focused, setFocused] = useState(() => settle(initialIndex, count, false))
  const report = useRef(onIndexChange)

  useEffect(() => {
    report.current = onIndexChange
  }, [onIndexChange])

  useEffect(() => {
    report.current?.(focused)
  }, [focused])

  const focusSlide = useCallback((index: number) => setFocused(settle(index, count, loop)), [count, loop])

  const step = useCallback((delta: number) => setFocused((from) => settle(from + delta, count, loop)), [count, loop])

  useEffect(() => {
    if (!autoplay || count <= 1) return
    const tick = window.setInterval(
      () => setFocused((from) => (from + 1 >= count && !loop ? from : settle(from + 1, count, loop))),
      Math.max(autoplayDelay, 400),
    )
    return () => window.clearInterval(tick)
  }, [autoplay, autoplayDelay, count, loop])

  const motions = useMemo(
    () => ({
      strip: spring(0.2, 0.8, speed),
      card: spring(0.1, 1, speed),
      rail: spring(0.25, 0.5, speed),
    }),
    [speed],
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!enableKeyboard) return
    const delta = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0
    if (!delta) return
    event.preventDefault()
    step(delta)
  }

  const onPanEnd = (_: unknown, info: PanInfo) => {
    const thrown = info.offset.x + info.velocity.x * FLICK_WEIGHT
    if (Math.abs(thrown) < FLICK_DISTANCE) return
    step(thrown < 0 ? 1 : -1)
  }

  const head = !loop && focused === 0
  const tail = !loop && focused >= count - 1

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Galerija jela"
      onKeyDown={onKeyDown}
      className={`relative flex w-full select-none flex-col items-center overflow-hidden text-white outline-none ${className}`}
    >
      <div style={{ width: cardWidth }}>
        <motion.div
          className="flex w-fit"
          style={{ touchAction: "pan-y" }}
          animate={{ x: -focused * cardWidth }}
          transition={motions.strip}
          onPanEnd={enableDrag ? onPanEnd : undefined}
        >
          {items.map((item, index) => (
            <Slide
              key={`${item.src}-${index}`}
              item={item}
              offset={index - focused}
              focused={index === focused}
              width={cardWidth}
              aspectRatio={aspectRatio}
              rotation={rotation}
              scale={inactiveScale}
              perspective={perspective}
              radius={borderRadius}
              blur={titleBlur}
              captioned={showTitles}
              transition={motions.card}
              onPick={() => focusSlide(index)}
            />
          ))}
        </motion.div>
      </div>

      {(showControls || showDots) && (
        <div className="mt-10 flex items-center gap-5">
          {showControls && <Arrow side="prev" disabled={head} onPress={() => step(-1)} />}
          {showDots && <Rail items={items} current={focused} token={token} transition={motions.rail} onPick={focusSlide} />}
          {showControls && <Arrow side="next" disabled={tail} onPress={() => step(1)} />}
        </div>
      )}
    </div>
  )
}

export default SkewedCarousel
