import { fireEvent, render } from '@testing-library/react'
import getMockedProducts from '../../../packagesManager/mocks/getMockedProducts'
import ProductsTable from '../ProductsTable'

describe('The ProductsTable component', () => {
  describe('Actions', () => {
    it('Does not renders actions if not provided', () => {
      const { queryAllByText } = render(
        <ProductsTable products={getMockedProducts()} onRowClick={() => {}} />
      )

      const actionsText = queryAllByText('actions')
      expect(actionsText).toHaveLength(0)
    })

    it('Renders actions if provided', () => {
      const { getByText } = render(
        <ProductsTable
          products={[getMockedProducts()[0]]}
          onRowClick={() => {}}
          actions={[{ text: 'test', onClick: () => {} }]}
        />
      )

      getByText('actions')
      getByText('test')
    })

    it('Calls action onClick method on action click', () => {
      const mockedOnClick = jest.fn()

      const { getByText } = render(
        <ProductsTable
          products={[getMockedProducts()[0]]}
          onRowClick={() => {}}
          actions={[{ text: 'test', onClick: mockedOnClick }]}
        />
      )

      const action = getByText('test')
      fireEvent.click(action)

      expect(mockedOnClick).toHaveBeenCalledWith(getMockedProducts()[0])
    })
  })

  it('Calls onRowClick method on row click', () => {
    const mockedOnClick = jest.fn()
    const mockedProducts = [getMockedProducts()[0]]

    const { getByText } = render(
      <ProductsTable products={mockedProducts} onRowClick={mockedOnClick} />
    )

    const action = getByText(mockedProducts[0].sku)
    fireEvent.click(action)

    expect(mockedOnClick).toHaveBeenCalledWith(mockedProducts[0])
  })
})
