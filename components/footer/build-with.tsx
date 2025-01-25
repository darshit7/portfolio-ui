import { Link } from '~/components/ui/link'
import { Image } from '~/components/ui/image'
import { SITE_METADATA } from '~/data/site-metadata'

export function BuildWith() {
  return (
    <>
      <Link href="/">
        <Image
          src="/static/images/logo.jpg"
          alt={SITE_METADATA.headerTitle}
          width={5}
          height={5}
          className="h-5 w-5 rounded-xl"
          loading="eager"
        />
      </Link>
    </>
  )
}
