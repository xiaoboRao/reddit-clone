import { authModalState } from '@/atoms/authuthModalAtoms'
import { Button } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import React from 'react'

const AuthButtons: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '770px', sm: '110px' }}
        mr="8px"
        onClick={() => setModalState({ open: true, view: 'login' })}
      >
        Log In
      </Button>

      <Button
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '770px', sm: '110px' }}
        mr="8px"
        onClick={() => setModalState({ open: true, view: 'signup' })}
      >
        Sign Up
      </Button>
    </>
  )
}
export default AuthButtons
