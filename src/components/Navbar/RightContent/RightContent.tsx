import AuthModal from '@/components/Modal/Auth/AuthModal'
import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import Icons from './Icons'
import React from 'react'
import AuthButtons from './AuthButtons'
import UserMenu from './UserMenu'
type RightContentProp = {
  user?: User | null
}
const RightContent: React.FC<RightContentProp> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex alignItems="center" justifyContent="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  )
}
export default RightContent
