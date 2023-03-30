import { Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import CreateCommunityModal from './CreateCommunityModal'

type CommunitiesProps = {}

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem width="100%" _hover={{ bg: 'gray.100' }} onClick={() => setOpen(true)}>
        <Flex alignItems="center">
          <Icon as={GrAdd} fontSize="20px" mr="10px" />
          <Text>Create Community</Text>
        </Flex>
      </MenuItem>
    </>
  )
}
export default Communities
