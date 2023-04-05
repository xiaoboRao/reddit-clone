import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { auth, firestore } from '@/firebase/clientApp'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthButton: React.FC = () => {
  const [signInWithGoogle, userCreated, loading, error] = useSignInWithGoogle(auth)

  const createUserDocument = async (user: User) => {
    await setDoc(doc(firestore, 'users', user?.uid), JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCreated) {
      createUserDocument(userCreated?.user)
    }
  }, [userCreated])

  return (
    <Flex width="60%" direction="column" mb="10px">
      <Button variant="oauth" mb="10px" isLoading={loading} onClick={() => signInWithGoogle()}>
        <Image src="/images/googlelogo.png" height="20px" mr="10px" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error?.message}</Text>}
    </Flex>
  )
}
export default AuthButton
