import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Index from '../../pages'

describe('Challenge tests', () => {
  it('Should render', async () => {
    const { getByText } = render(<Index initialProducts={[]} />)

    await waitFor(() => getByText('UI challenge'))
  })
})
