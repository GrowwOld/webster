import { createStitches, createTheme } from '@stitches/react';

export const { styled, globalCss, theme } = createStitches({
  theme: {
    fonts: {
      default: ''
    },
    colors: {
      gray900: '#44475b',
      gray800: '#696c7c',
      gray700: '#7c7e8c',
      gray600: '#8f919d',
      gray500: '#a1a3ad',
      gray400: '#b0b2ba',
      gray300: '#c7c8ce',
      gray200: '#ddeee1',
      gray150: '#e9e9eb',
      gray100: '#f0f0f2',
      gray50: '#f8f8f8',
      green500: '00d09c',
      green300: '#66e3c4',
      green100: '#e5faf5',
      purple500: '#5367ff',
      purple300: '#984a4ff',
      purple100: '#eef0ff',
      yellow500: '#ffb61b',
      yellow100: '#fff5e0',
      red500: '#eb5b3c',
      red100: '#fae9e5'
    }
  }
});

export const darkTheme = createTheme('dark-theme', {
  colors: {
    black: '#121212',
    white: '#ffffff',
    gray900: '#f8f8f8',
    gray800: '#d1d1d1',
    gray700: '#b8b8b8',
    gray600: '#a0a0a0',
    gray500: '#888888',
    gray400: '#717171',
    gray300: '#595959',
    gray200: '#414141',
    gray150: '#2e2e2e',
    gray100: '#252525',
    gray50: '#1b1b1b',
    green500: '#0abb92',
    green300: '#0b5e49',
    green100: '#10362d',
    purple500: '#98a4ff',
    purple300: '#323c89',
    purple100: '#181a2a',
    yellow500: '#e7a61a',
    yellow100: '#46391d',
    red500: '#d55438',
    red100: '#411d16'
  }
});


// export const darkTheme = createTheme({
//   colors: {
//     hiContrast: "white",
//     loContrast: "black"
//   }
// });

// export const funTheme = createTheme({
//   colors: {
//     hiContrast: "blue",
//     loContrast: "pink"
//   }
// });
// export const redTheme = createTheme({
//   colors: {
//     hiContrast: "Cornsilk",
//     loContrast: "Maroon"
//   }
// });
