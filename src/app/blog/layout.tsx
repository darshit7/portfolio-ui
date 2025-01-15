export default function BlogLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 blog">
          <header className="space-y-4 pb-4 pt-4 md:space-y-5">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-2xl">
            All Posts
            </h1>
          </header>
          <div className="items-start">
            <div className="prose prose-base md:prose-lg max-w-none pb-8 dark:prose-dark xl:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </>
    )
  }