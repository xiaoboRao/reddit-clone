import { authModalState } from '@/atoms/AuthModalAtoms'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [logninForm, setLogninForm] = useState({})
  const [modalState, setModalState] = useRecoilState(authModalState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogninForm((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }))
  }
  const onSubmit = () => {}
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
      <Button type="submit" width="100%" height="36px" mb="10px" mt="10px">
        Log In
      </Button>
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
