import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { auth } from '@/firebase/clientApp'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
type AuthButtonProps = {}

const AuthButton: React.FC<AuthButtonProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  return (
    <Flex width="60%" direction="column" mb="10px">
      <Button variant="oauth" mb="10px" isLoading={loading} onClick={() => signInWithGoogle()}>
        <Image src="/images/googlelogo.png" height="20px" mr="10px" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  )
}
export default AuthButton
