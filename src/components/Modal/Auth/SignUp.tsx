import { authModalState } from '@/atoms/authuthModalAtoms'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { auth, firestore } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/error'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
type SignUpProps = {}

const SignUp: React.FC<SignUpProps> = () => {
  const [formError, setFormError] = useState('')
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [modalState, setModalState] = useRecoilState(authModalState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }))
  }
  const [createUserWithEmailAndPassword, user, loading, createUsererror] = useCreateUserWithEmailAndPassword(auth)
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
      const userRef = doc(collection(firestore, 'users'))

      await setDoc(userRef, JSON.parse(JSON.stringify(userCredential?.user)))
    } catch (error: any) {
      console.log('error', error?.message)
    }
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
      <Input
        name="confirmPassword"
        type="confirm password"
        mb="8px"
        onChange={onChange}
        fontSize="10px"
        placeholder="confirm password"
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
      {(formError || createUsererror) && (
        <Text textAlign="center" mt={2} fontSize="10px" color="red">
          {formError || FIREBASE_ERRORS[createUsererror?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button type="submit" width="100%" height="36px" mb="10px" mt="10px" isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="10px" justifyContent="center">
        <Text mr="5px">Already a redditor?</Text>
        <Text
          fontWeight={700}
          color="blue.500"
          cursor="pointer"
          onClick={() => setModalState((pre) => ({ ...pre, view: 'login' }))}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  )
}
export default SignUp
