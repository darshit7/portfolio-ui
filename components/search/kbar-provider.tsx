'use client'

import type { Action } from 'kbar'
import { KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation.js'
import { useEffect, useState, type ReactNode } from 'react'
import type { CoreContent, MDXDocument } from '~/types/data'
import { formatDate } from '~/utils/misc'
import { KBarModal } from './kbar-modal'

export interface KBarSearchProps {
  searchDocumentsPath: string | false
  defaultActions?: Action[]
  onSearchDocumentsLoad?: (json: CoreContent<MDXDocument>[]) => Action[]
}

export interface KBarConfig {
  provider: 'kbar'
  kbarConfig: KBarSearchProps
}

export function KBarSearchProvider({
  configs,
  children,
}: {
  configs: KBarSearchProps
  children: ReactNode
}) {
  const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } = configs
  const router = useRouter()
  const [searchActions, setSearchActions] = useState<Action[]>([])
  // Initialize to true when no search path is configured so the UI is never stuck loading.
  const [dataLoaded, setDataLoaded] = useState(!searchDocumentsPath)

  useEffect(() => {
    function mapPosts(posts: CoreContent<MDXDocument>[]) {
      const actions: Action[] = []
      for (const post of posts) {
        actions.push({
          id: post.path,
          name: post.title,
          keywords: post?.summary || '',
          section: 'Content',
          subtitle: formatDate(post.date),
          perform: () => router.push('/' + post.path),
        })
      }
      return actions
    }
    async function fetchData() {
      if (searchDocumentsPath) {
        try {
          const url =
            searchDocumentsPath.indexOf('://') > 0 || searchDocumentsPath.indexOf('//') === 0
              ? searchDocumentsPath
              : new URL(searchDocumentsPath, window.location.origin)
          const res = await fetch(url)
          if (!res.ok) {
            throw new Error(`Failed to load search documents: ${res.statusText}`)
          }
          const json = (await res.json()) as CoreContent<MDXDocument>[]
          const actions = onSearchDocumentsLoad ? onSearchDocumentsLoad(json) : mapPosts(json)
          setSearchActions(actions)
        } catch (e) {
          console.error(
            'Failed to load search documents:',
            e instanceof Error ? e.message : String(e)
          )
        } finally {
          setDataLoaded(true)
        }
      }
    }
    if (!dataLoaded && searchDocumentsPath) {
      fetchData()
    }
  }, [defaultActions, dataLoaded, router, searchDocumentsPath, onSearchDocumentsLoad])

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  )
}
