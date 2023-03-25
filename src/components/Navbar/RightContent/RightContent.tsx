import { Flex } from '@chakra-ui/react'
import React from 'react'
import AuthButtons from './AuthButtons'

const RightContent: React.FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <AuthButtons />
    </Flex>
  )
}
export default RightContent
