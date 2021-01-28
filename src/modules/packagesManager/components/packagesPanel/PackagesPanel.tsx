import React from 'react'
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

const AddPackageButton = styled(Button)`
  width: 130px;
  margin-bottom: 20px;
`

interface Props {
  packages: Package[]
  selectedPackage: Package | undefined
  addPackage: () => void
  removePackage: (packageId: number) => void
  selectPackage: (packageId: number) => void
  unpackProduct: (product: Product) => void
}

const PackagesPanel: React.FC<Props> = ({
  packages,
  selectedPackage,
  addPackage,
  selectPackage,
  removePackage,
  unpackProduct,
}) => {
  return (
    <Container>
      <h3>Packed Products</h3>

      <AddPackageButton onClick={addPackage}>Add Package</AddPackageButton>

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
        <p>Add a new package to pack items</p>
      )}
    </Container>
  )
}

export default PackagesPanel
