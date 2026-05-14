'use client'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'filled' | 'outline'
}

export default function Button({
  variant = 'filled',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'px-4 py-2 uppercase rounded-full text-sm font-medium transition-colors cursor-pointer'

  const disabledBase =
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent'

  const variants = {
    filled: 'bg-blue-800 text-white hover:bg-blue-700 active:bg-blue-900',
    outline:
      'border border-blue-800 text-blue-800 hover:bg-blue-50 active:bg-blue-100',
  }

  return (
    <button
      className={`${base} ${disabledBase} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
