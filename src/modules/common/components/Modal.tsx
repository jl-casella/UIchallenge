import React from 'react'
import ReactModal from 'react-modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
  height?: string
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          display: 'flex',
          margin: 'auto',
          width,
          height,
        },
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
