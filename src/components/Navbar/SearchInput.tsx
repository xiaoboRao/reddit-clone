import { PhoneIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon } from '@chakra-ui/react'
import React from 'react'

type SearchInputProps = {}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} alignItems="center" mr="8px">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<PhoneIcon color="gray.300" mb="4px" />} />
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
