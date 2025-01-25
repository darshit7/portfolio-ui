import clsx from 'clsx'

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('space-y-2 pt-6 md:space-y-5', className)}>
      <h1 className="text-xl font-extrabold leading-0 tracking-tight sm:text-xl sm:leading-0 md:text-xl md:leading-0">
        {title}
      </h1>
      <div className="text-gray-600 dark:text-gray-400 md:text-lg md:leading-7">{description}</div>
      {children}
    </div>
  )
}
