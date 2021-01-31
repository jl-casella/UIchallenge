import { fireEvent, render } from '@testing-library/react'
import BarcodeScannerHelper from '../BarcodeScannerHelper'

describe('The BarcodeScannerHelper component', () => {
  it('Resets after submitting', () => {
    const { getByRole } = render(<BarcodeScannerHelper />)

    const inputBefore = getByRole('textbox')
    fireEvent.change(inputBefore, { target: { value: 'test' } })
    expect((inputBefore as HTMLInputElement).value).toBe('test')

    const submitButton = getByRole('button')
    fireEvent.click(submitButton)

    const inputAfter = getByRole('textbox')
    expect((inputAfter as HTMLInputElement).value).toBe('')
  })

  it('Sends keyDown events to document', () => {
    const textToEnter = 'test'
    const { getByRole } = render(<BarcodeScannerHelper />)

    const inputBefore = getByRole('textbox')
    fireEvent.change(inputBefore, { target: { value: textToEnter } })

    const mockedKeyDown = jest.fn()
    document.addEventListener('keydown', mockedKeyDown)
    const submitButton = getByRole('button')
    fireEvent.click(submitButton)

    expect(mockedKeyDown).toHaveBeenCalledTimes(textToEnter.length)
    document.removeEventListener('keydown', mockedKeyDown)
  })
})
