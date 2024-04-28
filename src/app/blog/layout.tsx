export default function BlogLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 blog">
          <header className="space-y-4 pb-12 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Posts
            </h1>
            <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
            I write mostly about Python, emerging technologies or latest tech trends.
            </p>
          </header>
          <div className="items-start space-y-2 pt-8 xl:grid xl:grid-cols-3 xl:space-y-0">
            <div className="prose prose-base md:prose-lg max-w-none pb-8 dark:prose-dark xl:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </>
    )
  }