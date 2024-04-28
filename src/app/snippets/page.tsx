import path from 'path';
import SnippetList from "@/components/snippets/SnippetList";

export default function Snippets() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <header className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Snippets
          </h1>
          <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
          My snippets collection
          </p>
        </header>
        <div className="container py-12">
          <div className="grid-cols-2 gap-6 lg:grid">
            <SnippetList ></SnippetList>
          </div>
        </div>
        </div>
      </>
  );
}
