import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import AuthModal from '../Modal/Auth/AuthModal'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center" width="100%">
        <Image src="/images/redditFace.svg" height="30px" />
        <Image src="/images/redditText.svg" height="46px" display={{ base: 'none', md: 'block' }} />
        <AuthModal />
        <SearchInput />
        <RightContent />
      </Flex>
    </Flex>
  )
}
export default Navbar
