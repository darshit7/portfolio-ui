import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Image } from '~/components/ui/image'

vi.mock('next/navigation', () => ({ usePathname: () => '/test-path' }))

// next/image does not invoke onLoad synchronously: it runs img.decode() and
// resolves the handler in a microtask, so every assertion here must be awaited.
describe('Image', () => {
  // 51 — REGRESSION: onLoad was spread before {...rest}, so a caller supplying
  // its own onLoad silently replaced the internal handler and the blur-up
  // placeholder never cleared -- the image stayed blurred and pulsing forever.
  it('runs a caller onLoad and still clears the blur-up', async () => {
    const onLoad = vi.fn()
    const { container } = render(
      <Image src="/static/images/avatar.jpg" alt="avatar" width={64} height={64} onLoad={onLoad} />
    )

    const img = screen.getByAltText('avatar')
    expect(img.className).toContain('blur-xl')

    fireEvent.load(img)

    await waitFor(() => {
      expect(onLoad, 'caller onLoad was dropped').toHaveBeenCalledTimes(1)
    })
    await waitFor(() => {
      expect(screen.getByAltText('avatar').className, 'blur-up never cleared').toContain('blur-0')
    })
    expect(container.querySelector('.animate-pulse')).toBeNull()
  })

  it('clears the blur-up when no caller onLoad is given', async () => {
    render(<Image src="/static/images/logo.jpg" alt="logo" width={64} height={64} />)

    const img = screen.getByAltText('logo')
    expect(img.className).toContain('blur-xl')

    fireEvent.load(img)

    await waitFor(() => {
      expect(screen.getByAltText('logo').className).toContain('blur-0')
    })
  })
})
