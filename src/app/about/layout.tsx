export default function AboutLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      {/*PageSeo*/}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <header className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">More about me and this blog</p>
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