import { authModalState } from '@/atoms/AuthModalAtoms'
import React from 'react'
import { useRecoilState } from 'recoil'
import Login from './Login'
import SignUp from './SignUp'

type AuthInputsProps = {}

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const [modalState] = useRecoilState(authModalState)

  return (
    <>
      {modalState.view === 'login' && <Login />}
      {modalState.view === 'signup' && <SignUp />}
    </>
  )
}
export default AuthInputs
