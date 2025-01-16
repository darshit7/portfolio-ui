import NotesList from "@/components/notes/NotesList";

export default function Notes() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <header className="space-y-4 pb-4 pt-4 md:space-y-5">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-2xl md:leading-14">
            Notes
          </h1>
        </header>
        <div className="container py-12">
          <div className="grid-cols-2 gap-6 lg:grid">
            <NotesList></NotesList>
          </div>
        </div>
        </div>
      </>
  );
}
