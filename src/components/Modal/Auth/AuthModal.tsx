import { authModalState } from '@/atoms/AuthModalAtoms'
import { useRecoilState } from 'recoil'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AuthInputs from './AuthInputs'
import AuthButton from './AuthButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import ResetPassword from './ResetPassword'

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)
  const handleModalClose = () => {
    setModalState((pre) => ({
      ...pre,
      open: false,
    }))
  }

  useEffect(() => {
    if (user) {
      handleModalClose()
    }
    console.log('user', user)
  }, [user])

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
            {modalState.view === 'login' || modalState.view === 'signup' ? (
              <>
                <AuthButton />
                <Text color="gray.500" fontWeight={700} mb="10px">
                  OR
                </Text>
                <AuthInputs />{' '}
              </>
            ) : (
              <ResetPassword />
            )}
          </ModalBody>

          <Flex direction="column" alignItems="center" justifyContent="center" width="70%"></Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
