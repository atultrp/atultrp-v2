import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { CommandPaletteProvider, useCommandPalette } from './CommandPalette'
import { ToastProvider } from './Toast'

const push = vi.fn(() => Promise.resolve(true))
vi.mock('next/router', () => ({ useRouter: () => ({ pathname: '/', push }) }))

function Opener() {
  const { open } = useCommandPalette()
  return (
    <button type="button" onClick={open}>
      open
    </button>
  )
}

const setup = () =>
  render(
    <ToastProvider>
      <CommandPaletteProvider>
        <Opener />
      </CommandPaletteProvider>
    </ToastProvider>,
  )

afterEach(() => {
  cleanup()
  push.mockClear()
})

describe('CommandPalette', () => {
  it('toggles with Ctrl+K and closes with Escape', () => {
    setup()
    expect(screen.queryByRole('dialog')).toBeNull()

    act(() => {
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    })
    const input = screen.getByRole('combobox')
    expect(document.activeElement).toBe(input)

    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('filters commands and runs the active one on Enter', () => {
    setup()
    fireEvent.click(screen.getByText('open'))

    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'fastrag' } })

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]?.getAttribute('aria-selected')).toBe('true')
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0]?.id)

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(push).toHaveBeenCalledWith('/work/fastrag')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('moves the active option with the arrow keys', () => {
    setup()
    fireEvent.click(screen.getByText('open'))
    const input = screen.getByRole('combobox')

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const options = screen.getAllByRole('option')
    expect(options[1]?.getAttribute('aria-selected')).toBe('true')

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(screen.getAllByRole('option')[0]?.getAttribute('aria-selected')).toBe('true')
  })
})
