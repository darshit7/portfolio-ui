'use client'

import { clsx } from 'clsx'
import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function CopyCodeButton({
  className,
  parent,
}: {
  className?: string
  parent: 'code-title' | 'code-block'
}) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget
    let preTag: HTMLPreElement | null = null
    if (parent === 'code-block') {
      preTag = button.nextElementSibling as HTMLPreElement
    } else if (parent === 'code-title') {
      const figure = button.parentElement?.nextElementSibling
      preTag = figure?.querySelector('pre') as HTMLPreElement
    }
    if (!preTag) return

    try {
      // navigator.clipboard is undefined on non-secure origins (e.g. previewing
      // over a LAN IP), and writeText rejects if permission is denied.
      await navigator.clipboard.writeText(preTag.textContent ?? '')
    } catch {
      return
    }

    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      aria-label="Copy code"
      className={clsx([
        'copy-code',
        'bg-solarized-light p-2 dark:bg-github-dark-dimmed',
        className,
      ])}
      onClick={handleCopy}
    >
      {copied ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4.5 w-4.5" />}
    </button>
  )
}
