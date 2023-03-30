import React from 'react'
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { MdOutlineLogin } from 'react-icons/md'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { TiHome } from 'react-icons/ti'
import Communities from './Communities'
const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        mr="10px"
        ml={{ base: 0, md: '10px' }}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex alignItems="center" justifyContent="space-between" width={{ base: 'auto', lg: '200px' }}>
          <Flex alignItems="center">
            <Icon fontSize="24px" mr={{ base: '5px', md: '10px' }} as={TiHome} />
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text fontWeight={600} fontSize="15px">
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  )
}
export default Directory
