import { render, waitFor } from '@testing-library/react'
import React from 'react'
import getMockedProducts from '../../../mocks/getMockedProducts'
import PackageView from '../PackageView'

describe('The PackageView component', () => {
  it('Renders instruction on how to add product to package if there are no products inside', async () => {
    const { getByText } = render(
      <PackageView
        productsPackage={{ id: 1, products: [] }}
        unpackProduct={() => {}}
      />
    )

    await waitFor(() =>
      getByText(
        'Click on the product in the left window to pack it to the package'
      )
    )
  })

  it('Renders instruction on how to remove product from package if there are any products inside', async () => {
    const { getByText } = render(
      <PackageView
        productsPackage={{ id: 1, products: [getMockedProducts()[0]] }}
        unpackProduct={() => {}}
      />
    )

    await waitFor(() =>
      getByText('Click on the product to remove it from the package')
    )
  })

  it('Renders products in rows if there are any in the package', async () => {
    const products = [getMockedProducts()[0]]
    const { queryAllByRole } = render(
      <PackageView
        productsPackage={{ id: 1, products }}
        unpackProduct={() => {}}
      />
    )

    await waitFor(() =>
      // table head row + 1 data row
      expect(queryAllByRole('row')).toHaveLength(products.length + 1)
    )
  })

  it('Renders products in rows if there is more than one in the package', async () => {
    const products = [getMockedProducts()[0], getMockedProducts()[1]]
    const { queryAllByRole } = render(
      <PackageView
        productsPackage={{ id: 1, products }}
        unpackProduct={() => {}}
      />
    )

    await waitFor(() =>
      // table head row + 2 data rows
      expect(queryAllByRole('row')).toHaveLength(products.length + 1)
    )
  })
})
