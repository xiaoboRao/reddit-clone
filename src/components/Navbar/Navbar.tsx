import { auth } from '@/firebase/clientApp'
import { Flex, Image } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center" width="100%">
        <Image src="/images/redditFace.svg" height="30px" />
        <Image src="/images/redditText.svg" height="46px" display={{ base: 'none', md: 'block' }} />

        <SearchInput />
        <RightContent user={user as User} />
      </Flex>
    </Flex>
  )
}
export default Navbar
