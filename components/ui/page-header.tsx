import clsx from 'clsx'

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string
  // Optional: /notes carries its title alone, and rendering the wrapper for an
  // absent description would leave its `md:text-lg` line box as dead space
  // above the content.
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('space-y-2 pb-6 pt-6 md:space-y-3', className)}>
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      {description && (
        <div className="text-gray-600 dark:text-gray-400 md:text-lg md:leading-8">
          {description}
        </div>
      )}
      {children}
    </div>
  )
}
