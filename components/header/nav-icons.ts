import type { LucideIcon } from 'lucide-react'
import { Satellite } from 'lucide-react'
import type { NavIconName } from '~/data/navigation'

/**
 * Resolves the string `icon` on a nav link to a component. Lives here rather
 * than in `data/navigation.ts` so the data layer stays free of React imports.
 */
export const NAV_ICONS: Record<NavIconName, LucideIcon> = {
  satellite: Satellite,
}
