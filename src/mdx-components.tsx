import type { MDXComponents } from 'mdx/types'
import CustomLink from '@/components/MDXExternalLink';
import Twemoji from '@/components/Twemoji';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    Twemoji,
    ...components,
  }
}