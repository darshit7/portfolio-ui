import { Home } from '~/components/home-page'
import { JsonLd } from '~/components/seo/json-ld'
import { homeGraph } from '~/utils/json-ld'

export default async function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Home />
    </>
  )
}
