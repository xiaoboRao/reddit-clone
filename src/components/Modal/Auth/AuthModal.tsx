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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import AuthInputs from './AuthInputs'
import AuthButton from './AuthButton'

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
      <Modal isOpen={modalState.open} onClose={handleModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === 'login' && 'Login'} {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb="20px">
            <AuthButton />
            <Text color="gray.500" fontWeight={700} mb="10px">
              OR
            </Text>
            <AuthInputs />
          </ModalBody>

          <Flex direction="column" alignItems="center" justifyContent="center" width="70%"></Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
