import { getByRole, render } from '@testing-library/react'
import getMockedProducts from '../../../mocks/getMockedProducts'
import ProductsPanel from '../ProductsPanel'

describe('The ProductsPanel component', () => {
  it('Renders information that all products are packed', () => {
    const { getByText } = render(
      <ProductsPanel products={[]} packProduct={() => {}} />
    )

    getByText('All products are already packed')
  })

  it('Renders products table if there are any products provided', () => {
    const { getByRole } = render(
      <ProductsPanel products={getMockedProducts()} packProduct={() => {}} />
    )

    getByRole('table')
  })
})
