import type { SVGProps } from 'react'

/**
 * Stand-in for SVGR-transformed `~/icons/*.svg` imports, which only exist in
 * the Next build. Renders a real <svg> so accessibility assertions
 * (aria-hidden, aria-label on the parent) still behave as they do in production.
 */
export default function SvgMock(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="svg-mock" {...props} />
}
