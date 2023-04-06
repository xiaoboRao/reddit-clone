import React from 'react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import { FaRedditSquare } from 'react-icons/fa'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { IoSparkles } from 'react-icons/io5'
import { auth } from '@/firebase/clientApp'
import { signOut, User } from 'firebase/auth'
import { authModalState } from '@/atoms/AuthModalAtoms'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { CommunityState } from '@/atoms/communitiesAtom'

type UserMenuProps = {
  user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const resetCommunityState = useResetRecoilState(CommunityState)
  const handleLogout = async () => {
    await signOut(auth)
    resetCommunityState()
  }
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            {user ? (
              <>
                <Icon fontSize={24} mr={1} color="gray.300" as={FaRedditSquare} />
                <Box
                  display={{ base: 'none', lg: 'flex' }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>{user?.displayName || user?.email?.split('@')[0]}</Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem fontSize="15px" fontWeight={700} _hover={{ color: 'white', bg: 'blue.500' }}>
              <Flex align="center">
                <Icon fontSize="20px" mr="10px" as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuItem
              fontSize="15px"
              fontWeight={700}
              _hover={{ color: 'white', bg: 'blue.500' }}
              onClick={handleLogout}
            >
              <Flex align="center">
                <Icon fontSize="20px" mr="10px" as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="15px"
            fontWeight={700}
            _hover={{ color: 'white', bg: 'blue.500' }}
            onClick={() => setModalState({ view: 'login', open: true })}
          >
            <Flex align="center">
              <Icon fontSize="20px" mr="10px" as={MdOutlineLogin} />
              Log In / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
export default UserMenu
