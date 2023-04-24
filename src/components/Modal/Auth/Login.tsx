import { authModalState } from '@/atoms/authuthModalAtoms'
import { auth } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/error'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [logninForm, setLogninForm] = useState({ email: '', password: '' })
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [signInWithEmailAndPassword, user, loading, loginError] = useSignInWithEmailAndPassword(auth)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogninForm((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }))
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signInWithEmailAndPassword(logninForm.email, logninForm.password)
  }
  return (
    <form style={{ width: '60%' }} onSubmit={onSubmit}>
      <Input
        name="email"
        type="email"
        required
        mb="8px"
        onChange={onChange}
        fontSize="10px"
        placeholder="email"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.100"
      />
      <Input
        name="password"
        type="password"
        required
        mb="8px"
        onChange={onChange}
        fontSize="10px"
        placeholder="password"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.100"
      />
      {loginError && (
        <Text fontSize="10px" color="red">
          {FIREBASE_ERRORS[loginError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      <Button type="submit" width="100%" height="36px" mb="10px" mt="10px">
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="10px" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="10px"
          color="blue.500"
          cursor="pointer"
          onClick={() => setModalState((pre) => ({ ...pre, view: 'resetPassword' }))}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="10px" justifyContent="center">
        <Text mr="5px">New Here?</Text>
        <Text
          fontWeight={700}
          color="blue.500"
          cursor="pointer"
          onClick={() => setModalState((pre) => ({ ...pre, view: 'signup' }))}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  )
}
export default Login
