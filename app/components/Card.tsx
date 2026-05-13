type CardProps = {
  title?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function Card({
  title,
  footer,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={`w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md ${className || ''}`}
    >
      {title && <div className="px-6 py-4 text-center">{title}</div>}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="flex gap-2 px-6 py-4">{footer}</div>}
    </div>
  )
}
