import { PhoneIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'

type SearchInputProps = {
  user?: User | null
}

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '600px'} alignItems="center" mr="8px">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon mb={2} />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10px"
          _placeholder={{ color: 'gray.500' }}
          _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
          _focus={{ outline: 'none', border: '1px solid', borderColor: 'blue.500' }}
          height="34px"
          bg="gray.100"
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
