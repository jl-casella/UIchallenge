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
  height,
  width,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          display: 'flex',
          margin: 'auto',
          height,
          width,
          minWidth: '320px',
          inset: '0px',
        },
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
