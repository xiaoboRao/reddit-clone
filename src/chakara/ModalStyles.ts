import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'blackAlpha.200', //change the background
  },
  header: {
    color: 'black',
  },
  closeButton: {
    color: 'black',
  },
  dialog: {
    borderRadius: 'md',
    bg: `white`,
    color: 'black',
  },
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
})
