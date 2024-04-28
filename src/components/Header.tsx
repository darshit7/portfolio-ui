import { useRouter, usePathname } from 'next/navigation'
import clsx from 'clsx';
import Twemoji from '@/components/Twemoji';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';


import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import AnalyticsLink from './AnalyticsLink';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="supports-backdrop-blur fixed left-0 right-0 top-0 z-40 bg-white/75 py-4 backdrop-blur dark:bg-dark/75">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
      <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <div className="animate-wave">
          </div>
          <div className="group ml-2 text-xl font-bold transition duration-300">
          <Twemoji emoji="d" className="ml-4"/><Twemoji emoji="p" className="ml-4"/>
          </div>
        </Link>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  'mx-1 rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                  pathname.startsWith(link.href)
                    ? 'bg-gray-200 dark:bg-primary'
                    : 'hover:bg-gray-200 dark:hover:bg-primary'
                )}
                data-umami-event={`nav-${link.href.replace('/', '')}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <AnalyticsLink />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};