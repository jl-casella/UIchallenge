import React from 'react'
import styled from 'styled-components'

interface PackageTabProps {
  packageNumber: number
  active?: boolean
  onSelect: () => void
  canBeRemoved: boolean
  onRemove: () => void
}

const PackageTabContainer = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 140px;
  border: 1px solid grey;
  padding: 5px 10px;
  margin-bottom: 10px;
  margin-right: 5px;

  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  cursor: pointer;
`

const RemoveButton = styled.button`
  margin-left: 4px;
  cursor: pointer;
`

const PackageTab: React.FC<PackageTabProps> = ({
  packageNumber,
  active,
  onSelect,
  canBeRemoved,
  onRemove,
}) => (
  <PackageTabContainer active={active} onClick={onSelect}>
    <div>Package {packageNumber}</div>
    {canBeRemoved && <RemoveButton onClick={onRemove}>✖</RemoveButton>}
  </PackageTabContainer>
)

export default PackageTab
