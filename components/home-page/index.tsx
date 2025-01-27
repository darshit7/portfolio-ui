import { ProfileCard } from '~/components/cards/profile'
import { Container } from '~/components/ui/container'
import { Greeting } from './greeting'
import { Intro } from './intro'

export function Home() {
  return (
    <Container as="div" className="pt-0">
      <div className="py-2 md:pb-0 xl:grid xl:grid-cols-3">
        <div className="space-y-4 md:space-y-6 md:pr-8 xl:col-span-2">
          <Greeting />
          <div className="text-base leading-7 text-gray-600 dark:text-gray-400 md:text-lg md:leading-8">
            <Intro />
          </div>
        </div>
        <div className="lg:pl-0 md:pl-4 pt-8 xl:block">
          <ProfileCard />
        </div>
      </div>
    </Container>
  )
}
