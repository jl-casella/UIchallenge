import { fireEvent, render, waitFor } from '@testing-library/react'
import 'jest-styled-components'
import React from 'react'
import renderer from 'react-test-renderer'
import PackageTab from '../PackageTab'

describe('The PackageTab component', () => {
  it('Renders a Package word with a given number of the package', async () => {
    const { getByText } = render(
      <PackageTab
        packageNumber={5}
        onRemove={() => {}}
        canBeRemoved
        onSelect={() => {}}
      />
    )

    await waitFor(() => getByText('Package 5'))
  })

  it('Fires onSelect action on click on the tab', async () => {
    const mockedOnSelect = jest.fn()
    const { getByText } = render(
      <PackageTab
        packageNumber={5}
        onRemove={() => {}}
        canBeRemoved
        onSelect={mockedOnSelect}
      />
    )

    expect(mockedOnSelect).toHaveBeenCalledTimes(0)

    const text = getByText('Package 5')
    fireEvent.click(text)

    expect(mockedOnSelect).toHaveBeenCalledTimes(1)
  })

  it('Fires onRemove action on click on the x button', async () => {
    const mockedOnRemove = jest.fn()
    const { getByRole } = render(
      <PackageTab
        packageNumber={5}
        onRemove={() => {}}
        canBeRemoved
        onSelect={mockedOnRemove}
      />
    )

    expect(mockedOnRemove).toHaveBeenCalledTimes(0)

    const removeButton = getByRole('button')
    fireEvent.click(removeButton)

    expect(mockedOnRemove).toHaveBeenCalledTimes(1)
  })

  it('Has normal text by default', () => {
    const result = renderer
      .create(
        <PackageTab
          packageNumber={5}
          onRemove={() => {}}
          canBeRemoved={true}
          onSelect={() => {}}
        />
      )
      .toJSON()

    expect(result).toHaveStyleRule('font-weight', 'normal')
  })

  it('Has bolded text if active prop passed', () => {
    const result = renderer
      .create(
        <PackageTab
          active
          packageNumber={5}
          onRemove={() => {}}
          canBeRemoved={true}
          onSelect={() => {}}
        />
      )
      .toJSON()

    expect(result).toHaveStyleRule('font-weight', 'bold')
  })
})
