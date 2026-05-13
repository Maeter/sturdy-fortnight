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
      className={`w-full max-w-md overflow-hidden rounded-2xl bg-white px-6 py-4 shadow-md ${className || ''} flex flex-col gap-4`}
    >
      {title && <div className="text-center">{title}</div>}
      <div>{children}</div>
      {footer && <div className="flex gap-2">{footer}</div>}
    </div>
  )
}
