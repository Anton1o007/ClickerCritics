import { ThemeContext } from 'styled-components';

import { useContext } from 'react';

const ochentera = {
  aquagreen: '#64C4AA',
  accent: '#FFD700', // Amarillo
  background: '#000000', // Negro
  text: '#FFFFFF', // Blanco
  purple: '#BB6BD9', // Morado
  blue: '#3FC1C9', // Azul claro
  green: '#9BC53D', // Verde lima
  orange: '#FF5733', // Naranja
  pink0: '#FF69B4', // Rosa
  pink1: '#E90076', // Rosa fuerte
  teal: '#00A6A6', // Verde azulado
  yellow: '#FFC300', // Amarillo brillante
  red: '#E63946', // Rojo
};

const nord = {
  black: '#000000',  // Negro absoluto
  dark0: '#121212',  // Negro más oscuro
  dark1: '#2e3440',
  dark2: '#3b4252',
  dark3: '#434c5e',
  dark4: '#4c566a',
  light0: '#f5f5f5',  // Blanco más claro
  light1: '#d8dee9',
  light2: '#e5e9f0',
  light3: '#eceff4',
  white: '#ffffff',   // Blanco absoluto
  blue1: '#8fbcbb',
  blue2: '#88c0d0',
  blue3: '#81a1c1',
  blue4: '#5e81ac',
  red: '#bf616a',
  orange: '#d08770',
  yellow: '#ebcb8b',
  green: '#a3be8c',
  purple: '#b48ead',
  light_grey: '#9E9E9E',
  bronze: '#BF8970',
};

export const theme = {
  ochentera, nord,
};

export type Theme = typeof theme;

export default theme as Theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
export const useTheme = () => useContext(ThemeContext);