import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CopyCodeButton } from '~/components/mdx/copy-code-button'

function CodeBlock({ code }: { code: string }) {
  return (
    <div>
      <CopyCodeButton parent="code-block" />
      <pre>{code}</pre>
    </div>
  )
}

/** The icon swap is the only signal of copied state. */
const isCopied = (button: Element) => button.querySelector('.lucide-check') !== null

function setClipboard(impl: (() => Promise<void>) | undefined) {
  Object.defineProperty(navigator, 'clipboard', {
    value: impl ? { writeText: vi.fn(impl) } : undefined,
    configurable: true,
    writable: true,
  })
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  setClipboard(() => Promise.resolve())
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('CopyCodeButton', () => {
  // 45 — REGRESSION: without an explicit type, a button defaults to submit.
  it('is an explicit type="button"', () => {
    render(<CodeBlock code="const a = 1" />)
    expect(screen.getByRole('button', { name: /copy code/i })).toHaveAttribute('type', 'button')
  })

  it('enters the copied state on a successful copy', async () => {
    render(<CodeBlock code="const a = 1" />)
    const button = screen.getByRole('button', { name: /copy code/i })

    await act(async () => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const a = 1')
    expect(isCopied(button)).toBe(true)
  })

  // 42 — REGRESSION: the reset timer lived at module scope, so copying a second
  // block cleared the first block's timer and froze its checkmark forever.
  it('keeps copied state independent between two buttons', async () => {
    render(
      <>
        <CodeBlock code="first" />
        <CodeBlock code="second" />
      </>
    )
    const [first, second] = screen.getAllByRole('button', { name: /copy code/i })

    await act(async () => {
      first.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await act(async () => {
      vi.advanceTimersByTime(100)
      second.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    // Past the first button's 2s window: it must have reset on its own timer,
    // which the shared-module-timer bug prevented.
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })

    expect(isCopied(first), 'first button stayed stuck in the copied state').toBe(false)
  })

  // 43 — REGRESSION: the promise was never awaited, so a rejection was
  // unhandled and the tick still appeared, confirming a copy that never happened.
  it('does not confirm when the clipboard write rejects', async () => {
    setClipboard(() => Promise.reject(new Error('denied')))
    render(<CodeBlock code="const a = 1" />)
    const button = screen.getByRole('button', { name: /copy code/i })

    await act(async () => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(isCopied(button)).toBe(false)
  })

  // 44 — REGRESSION: navigator.clipboard is undefined on non-secure origins,
  // e.g. previewing on a phone over a LAN IP, which threw a hard TypeError.
  it('does not throw when the clipboard API is unavailable', async () => {
    setClipboard(undefined)
    render(<CodeBlock code="const a = 1" />)
    const button = screen.getByRole('button', { name: /copy code/i })

    await act(async () => {
      expect(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true }))).not.toThrow()
    })

    expect(isCopied(button)).toBe(false)
  })
})
