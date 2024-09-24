'use client'
import Link from '@/components/Link';
import Snowfall from 'react-snowfall';
import Twemoji from '@/components/Twemoji';
import siteMetadata from '@/data/siteMetadata';
import Avatar from '@/components/homepage/Avatar';
import Heading from '@/components/homepage/Heading';
import Greeting from '@/components/homepage/Greeting';
import TypedBios from '@/components/homepage/TypedBios';
import BlogLinks from '@/components/homepage/BlogLinks';
import ShortDescription from '@/components/homepage/ShortDescription';

export default function HomePage() {
  const { headerTitle, title, description } = siteMetadata;

  return (
    <div className="relative">
      <Snowfall
        snowflakeCount={60}
        style={{
          zIndex: -1,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Include SEO */}
      <div className="mt-8 dark:divide-gray-700 md:mt-8">
        <Greeting />
        <div className="flex flex-col justify-between md:my-4 md:pb-8 xl:flex-row">
          <Avatar />
          <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
            <Heading />
            <TypedBios />
            <ShortDescription />
            <BlogLinks />
            <p className="my-8 lex">
              <span className="mr-2">Happy reading</span>
              <Twemoji emoji="clinking-beer-mugs" />
            </p>
          </div>
        </div>
      </div>

      {/* List all post */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Recent Posts
          </h1>
          <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">{siteMetadata.blog_description}</p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li key="#" className="py-6">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={"date"}>{"Aug 18, 2023"}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`https://medium.com/python-in-plain-english/beyond-the-gil-future-of-parallel-computing-in-python-38ef2a80555c`} className="text-gray-900 dark:text-gray-100">
                          {"Beyond the GIL: Future of Parallel Computing in Python"}
                        </Link>
                      </h2>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">{""}</div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`https://medium.com/python-in-plain-english/beyond-the-gil-future-of-parallel-computing-in-python-38ef2a80555c`}
                      className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                      aria-label={`Read "${title}"`}
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <Link href="/blog" className="text-primary hover:text-sky-600 dark:hover:text-sky-400" aria-label="All posts">
          All Posts &rarr;
        </Link>
      </div>
    </div>
  );
}