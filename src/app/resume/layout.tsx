import path from 'path';
import { readMDXFile } from '@/utils/mdx'
import TOCInline from '@/components/ToCInline';

export default async function MdxLayout({ children }: { children: React.ReactNode }) {
  let { toc } = await readMDXFile(path.join(process.cwd(), 'src', 'data', 'resume', 'resume.mdx'));
    return (
        <>
          <div className="resume">
            <header className="space-y-2 pb-8 pt-6 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Resume
              </h1>
              <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
                My professional career, experiences, and skills. 
              </p>
            </header>
          <div className="border border-t border-gray-200 dark:border-gray-700" />
          <main className="mx-auto gap-12 max-w-screen-xl mx-auto p-3 md:p-8 bg-gray-100 my-12 rounded-md md:flex space-y-12 md:space-y-0">
            <div className="table-of-content top-20 self-start pl-0 text-gray-500 md:sticky">
              <TOCInline toc={toc} toHeading={2}/>
            </div>
            <div className="border-l border-gray-300 hidden md:block" />
            <div className="text-gray-900 leading-6 space-y-5 prose prose-slate grow table-auto border-collapse">
              {children}
            </div>
          </main>
        </div>
      </>
    )
  }
  