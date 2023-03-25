import { authModalState } from '@/atoms/AuthModalAtoms'
import { useRecoilState } from 'recoil'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const handleModalClose = () => {
    setModalState((pre) => ({
      ...pre,
      open: false,
    }))
  }
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === 'login' && 'Login'} {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
            here is modal
          </ModalBody>

          <Flex direction="column" alignItems="center" justifyContent="center" width="70%"></Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
