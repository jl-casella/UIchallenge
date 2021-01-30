import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../common/components/Button'
import { Package, Product } from '../../types'
import PackageTab from './PackageTab'
import PackageView from './PackageView'

const Container = styled.div`
  flex: 1;
  padding: 20px;
`

const TabsContainer = styled.div`
  margin: 10px 0;

  display: flex;
  flex-direction: row;

  flex-wrap: wrap;

  padding-bottom: 10px;
  border-bottom: 1px solid grey;
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const AddPackageButton = styled(Button)`
  width: 130px;
  margin-right: 10px;
`

const ShipButton = styled(Button)`
  font-weight: bold;
`

const WarningNotification = styled.p`
  color: red;
`

const SuccessNotification = styled.p`
  color: green;
`

interface Props {
  packages: Package[]
  selectedPackage: Package | undefined
  addPackage: () => void
  removePackage: (packageId: number) => void
  selectPackage: (packageId: number) => void
  unpackProduct: (product: Product) => void
  canShip: boolean
  onShip: () => void
  showSuccessMessage: boolean
}

const PackagesPanel: React.FC<Props> = ({
  packages,
  selectedPackage,
  addPackage,
  selectPackage,
  removePackage,
  unpackProduct,
  canShip,
  onShip,
  showSuccessMessage,
}) => {
  const [isShipWarningVisible, setIsShipWarningVisible] = useState<boolean>(
    false
  )

  const handleShipClick = useCallback(() => {
    if (canShip) {
      onShip()
      setIsShipWarningVisible(false)
    } else {
      setIsShipWarningVisible(true)
    }
  }, [canShip, onShip])

  return (
    <Container>
      <h3>Packed Products</h3>

      <ActionsContainer>
        <AddPackageButton onClick={addPackage}>Add Package</AddPackageButton>
        <ShipButton onClick={handleShipClick}>Ship</ShipButton>
      </ActionsContainer>

      {isShipWarningVisible ? (
        <WarningNotification>
          You cannot ship until all products are packed!
        </WarningNotification>
      ) : null}

      {showSuccessMessage ? (
        <SuccessNotification>Packages were shipped!</SuccessNotification>
      ) : null}

      <TabsContainer>
        {packages.map((productsPackage, index) => (
          <PackageTab
            key={productsPackage.id}
            packageNumber={index + 1}
            onSelect={() => selectPackage(productsPackage.id)}
            canBeRemoved={productsPackage.products.length === 0}
            onRemove={() => removePackage(productsPackage.id)}
            active={productsPackage.id === selectedPackage?.id}
          />
        ))}
      </TabsContainer>

      {selectedPackage !== undefined ? (
        <PackageView
          productsPackage={selectedPackage}
          unpackProduct={unpackProduct}
        />
      ) : (
        <p>Add a new package or select one to pack items</p>
      )}
    </Container>
  )
}

export default PackagesPanel
