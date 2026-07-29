import type { MDXComponents } from 'mdx/types'
import React from 'react'
import ReactDOM from 'react-dom'
import * as _jsx_runtime from 'react/jsx-runtime'

export interface MDXLayoutRenderer {
  code: string
  components?: MDXComponents
  [key: string]: unknown
}

function getMDXComponent(code: string): React.ComponentType<Record<string, unknown>> {
  const scope = { React, ReactDOM, _jsx_runtime }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default as React.ComponentType<Record<string, unknown>>
}

// TS transpile it to a require which causes ESM error
// Copying the function from contentlayer as a workaround
// Copy of https://github.com/contentlayerdev/contentlayer/blob/main/packages/next-contentlayer/src/hooks/useMDXComponent.ts
export function useMDXComponent(code: string): React.ComponentType<Record<string, unknown>> {
  return React.useMemo(() => getMDXComponent(code), [code])
}

export function MDXLayoutRenderer({ code, components, ...rest }: MDXLayoutRenderer) {
  // Compiling `code` yields a new component type, so this must stay memoized on
  // `code` alone. It is only reached from server components today, but an
  // unmemoized version would remount the whole post body on every client render.
  const Mdx = useMDXComponent(code)
  // eslint-disable-next-line react-hooks/static-components
  return <Mdx components={components} {...rest} />
}
