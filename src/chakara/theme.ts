import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import { Button } from './buttonStyle'
import { Modal } from './ModalStyles'
const colors = {
  brand: {
    100: '#FF3c00',
  },
}

const fonts = {
  body: 'Open Sans, sans-serif',
}

const styles = {
  global: () => ({
    body: {
      bg: 'gray.200',
      color: 'black',
    },
  }),
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}
const components = {
  Button,
  Modal,
}
export const theme = extendTheme({ config, colors, fonts, styles, components })
