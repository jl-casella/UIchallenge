import { fireEvent, render } from '@testing-library/react'
import getMockedProducts from '../../../mocks/getMockedProducts'
import PackagesPanel from '../PackagesPanel'

const mockedPackage = { id: 1, products: [getMockedProducts()[0]] }

const getMockedPanelProps = () => ({
  packages: [mockedPackage],
  selectedPackage: mockedPackage,
  addPackage: () => {},
  selectPackage: () => {},
  removePackage: () => {},
  unpackProduct: () => {},
  onShip: () => {},
  canShip: false,
  showSuccessMessage: false,
})

describe('The PackagesPanel component', () => {
  describe('Actions', () => {
    it('Calls addPackage function on Add Product button click', () => {
      const mockedAddPackage = jest.fn()
      const { getByText } = render(
        <PackagesPanel
          {...getMockedPanelProps()}
          addPackage={mockedAddPackage}
        />
      )

      const addProductButton = getByText('Add Package')
      fireEvent.click(addProductButton)

      expect(mockedAddPackage).toHaveBeenCalledTimes(1)
    })

    it('Show warning message if ship button was clicked and canShip is falsy', () => {
      const { getByText } = render(<PackagesPanel {...getMockedPanelProps()} />)

      const shipButton = getByText('Ship')
      fireEvent.click(shipButton)

      getByText('You cannot ship until all products are packed!')
    })

    it('Calls onShip if ship button was clicked and canShip is truthy', () => {
      const mockedShip = jest.fn()
      const { getByText } = render(
        <PackagesPanel {...getMockedPanelProps()} onShip={mockedShip} canShip />
      )

      const shipButton = getByText('Ship')
      fireEvent.click(shipButton)

      expect(mockedShip).toHaveBeenCalledTimes(1)
    })

    it('Shows success message if showSuccessMessage prop is truthy', () => {
      const { getByText } = render(
        <PackagesPanel {...getMockedPanelProps()} showSuccessMessage />
      )

      getByText('Packages were shipped!')
    })

    it('Hides success message if showSuccessMessage prop is falsy', () => {
      const { queryAllByText } = render(
        <PackagesPanel {...getMockedPanelProps()} showSuccessMessage={false} />
      )

      const successMessage = queryAllByText('Packages were shipped!')
      expect(successMessage).toHaveLength(0)
    })
  })

  describe('Package tabs', () => {
    it('Selects specific package (calls selectPackage) on click on the tab', () => {
      const mockedSelectPackage = jest.fn()
      const mockedPackages = [
        { id: 0, products: [getMockedProducts()[0]] },
        { id: 1, products: [getMockedProducts()[1]] },
      ]
      const { getByText } = render(
        <PackagesPanel
          {...getMockedPanelProps()}
          packages={mockedPackages}
          selectedPackage={mockedPackages[0]}
          selectPackage={mockedSelectPackage}
        />
      )

      const secondPackage = getByText('Package 2')
      fireEvent.click(secondPackage)

      expect(mockedSelectPackage).toHaveBeenCalledWith(mockedPackages[1].id)
    })

    it('Removes specific package (calls removePackage) on click on the remove button', () => {
      const mockedRemovePackage = jest.fn()
      const mockedPackages = [
        { id: 0, products: [getMockedProducts()[0]] },
        { id: 1, products: [] },
      ]
      const { getByText } = render(
        <PackagesPanel
          {...getMockedPanelProps()}
          packages={mockedPackages}
          selectedPackage={mockedPackages[1]}
          removePackage={mockedRemovePackage}
        />
      )

      const secondPackage = getByText('✖', { selector: 'button' })
      fireEvent.click(secondPackage)

      expect(mockedRemovePackage).toHaveBeenCalledWith(mockedPackages[1].id)
    })
  })

  describe('Package details', () => {
    it('Displays package detailed view if any package selected', () => {
      const mockedPackage = [{ id: 0, products: [getMockedProducts()[0]] }]
      const { getByRole } = render(
        <PackagesPanel
          {...getMockedPanelProps()}
          packages={mockedPackage}
          selectedPackage={mockedPackage[0]}
        />
      )

      getByRole('table')
    })

    it('Displays a message to select a package or add a new one if no package is selected', () => {
      const { getByText } = render(
        <PackagesPanel {...getMockedPanelProps()} selectedPackage={undefined} />
      )

      getByText('Add a new package or select one to pack items')
    })
  })
})
