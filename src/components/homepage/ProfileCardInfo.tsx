import { Backpack, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Twemoji } from '@/components/Twemoji'
import siteMetadata from '@/data/siteMetadata';
import Image from 'next/image';
import XIcon from '../../../public/static/icons/x_white.svg';

export function ProfileCardInfo() {
  return (
    <div className="hidden py-4 xl:block xl:px-6">
      <div className="mb-2 mt-4 space-y-4">
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Backpack strokeWidth={1} size={20} />
          <p className="flex items-center px-2 space-x-1">
            <span>SDE III</span>
            <span>@</span>
            <a
              target="_blank"
              href="https://www.morganstanley.com/"
              rel="noreferrer"
              className="hover:underline"
            >
              Morgan Stanley
            </a>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <MapPin strokeWidth={1} size={20} />
          <p className="px-2">
          <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/Bengaluru"
              rel="noreferrer"
              className="hover:underline"
          >
            Bengaluru,&nbsp;
          </a>
          <span className="absolute inline-flex pt-px">
            IN&nbsp;<Twemoji emoji="flag-india" />
          </span>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Mail strokeWidth={1} size={20} />
          <a className="px-2" href={`mailto:${siteMetadata.email}`}>
            {siteMetadata.email}
          </a>
        </div>
        <div className="flex gap-2.5 items-center text-gray-700 dark:text-gray-200">
          <a
            target="_blank"
            href={siteMetadata.github}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-github"
          >
            <Github size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.github}</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.linkedin}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-linkedin"
          >
            <Linkedin size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.linkedin}</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.x}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-x"
          >
            <Image src={XIcon} className={'h-4 w-4'} alt="no img" color='#fff'/>
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">{siteMetadata.socialAccounts.x}</span>
          </a>
        </div>
      </div>
    </div>
  )
}