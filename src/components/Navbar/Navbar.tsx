import { defaultMenuItem } from '@/atoms/directoryMenuAtom'
import { auth } from '@/firebase/clientApp'
import useDirectory from '@/hooks/useDirectory'
import { Flex, Image } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Directory from './Directory/Directory'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth)
  const { onSelectMenuItem } = useDirectory()

  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Flex
          alignItems="center"
          mr={{ base: 0, md: '10px' }}
          cursor="pointer"
          onClick={() => {
            onSelectMenuItem(defaultMenuItem)
          }}
        >
          <Image src="/images/redditFace.svg" height="30px" />
          <Image src="/images/redditText.svg" height="46px" display={{ base: 'none', md: 'block' }} />
        </Flex>
        {user ? <Directory /> : ''}
        <SearchInput user={user as User} />
        <RightContent user={user as User} />
      </Flex>
    </Flex>
  )
}
export default Navbar
