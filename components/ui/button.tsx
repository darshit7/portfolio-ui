import clsx from 'clsx'

export function Button({
  children,
  as: Component = 'button',
  className,
  ...rest
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  [key: string]: unknown
}) {
  return (
    <Component
      className={clsx([
        'border border-transparent',
        'bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500',
        'text-white hover:text-white dark:text-white dark:hover:text-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-dark',
        'transition-colors duration-150',
        'text-sm font-medium leading-5',
        'inline-flex items-center gap-1 rounded-lg px-4 py-2 no-underline shadow',
        className,
      ])}
      {...rest}
    >
      {children}
    </Component>
  )
}
