import { clsx } from 'clsx'
import { Image } from '~/components/ui/image'
import { SITE_METADATA } from '~/data/site-metadata'
import { ProfileCardInfo } from './profile-info'

export function ProfileCard() {
  return (
    <div className="mb-8">
      <div
        className={clsx(
          'flex flex-col overflow-hidden md:rounded-lg',
          'bg-white shadow-card dark:bg-dark dark:shadow-card-stack',
          'outline outline-1 outline-gray-100 dark:outline-gray-600'
        )}
      >
        <Image
          src={SITE_METADATA.siteLogo}
          alt={SITE_METADATA.title}
          width={550}
          height={350}
          style={{
            objectPosition: '50% 15%',
            aspectRatio: '550/450',
          }}
          loading="eager"
        />
        <ProfileCardInfo />
        <span className="h-1.5 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700" />
      </div>
    </div>
  )
}
