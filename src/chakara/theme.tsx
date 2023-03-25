import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import { Button } from './buttonStyle'
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
    },
  }),
}
const components = {
  Button,
}
export const theme = extendTheme({ colors, fonts, styles, components })
