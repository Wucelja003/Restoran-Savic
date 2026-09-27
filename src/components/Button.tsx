import { Link } from "react-router-dom"

type ButtonProps = {
  to: string
  children: React.ReactNode
  variant?: "solid" | "outline"
}

export default function Button({ to, children, variant = "solid" }: ButtonProps) {
  const styles =
    variant === "solid"
      ? "bg-gold text-ink hover:bg-gold-dark"
      : "border border-gold text-gold hover:bg-gold hover:text-ink"

  return (
    <Link
      to={to}
      className={`inline-block px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] transition-colors ${styles}`}
    >
      {children}
    </Link>
  )
}
