import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'

type AuthButtonProps = {}

const AuthButton: React.FC<AuthButtonProps> = () => {
  return (
    <Flex width="60%" direction="column" mb="10px">
      <Button variant="oauth" mb="10px">
        <Image src="/images/googlelogo.png" height="20px" mr="10px" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </Flex>
  )
}
export default AuthButton
