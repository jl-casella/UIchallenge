import { fireEvent, render } from '@testing-library/react'
import getMockedProducts from '../../mocks/getMockedProducts'
import PackagesManager from '../PackagesManager'

describe('The PackagesManager component', () => {
  it('Creates products in package table when product is added to the package', () => {
    const mockedProducts = getMockedProducts()
    const productToClickSku = mockedProducts[1].sku

    const { getByText, getAllByRole } = render(
      <PackagesManager products={mockedProducts} />
    )

    const tablesBefore = getAllByRole('table')
    expect(tablesBefore).toHaveLength(1)

    const unpackedProduct = getByText(productToClickSku)
    fireEvent.click(unpackedProduct)

    const tablesAfter = getAllByRole('table')
    expect(tablesAfter).toHaveLength(2)
  })

  it('Removes products from package view if there are no products inside', () => {
    const mockedProducts = getMockedProducts()
    const productToClickSku = mockedProducts[1].sku

    const { getByText, getAllByRole, getAllByText } = render(
      <PackagesManager products={mockedProducts} />
    )

    const tablesBefore = getAllByRole('table')
    expect(tablesBefore).toHaveLength(1)

    const productBefore = getByText(productToClickSku)
    fireEvent.click(productBefore)

    const tablesAfterFirstClick = getAllByRole('table')
    expect(tablesAfterFirstClick).toHaveLength(2)

    const packedProduct = getAllByText(productToClickSku)
    fireEvent.click(packedProduct[1])

    const tablesAfterSecondClick = getAllByRole('table')
    expect(tablesAfterSecondClick).toHaveLength(1)
  })
})
