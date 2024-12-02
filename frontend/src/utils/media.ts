import { css } from 'styled-components';
import { Styles } from 'styled-components/dist/types';

// Para usar as querys basta utilizar no seguinte formato dentro da string do 'styled'
// ${media.sm` width: 50px `}

const device = {
  xxs: '320px',
  xs: '400px',
  sm: '600px',
  md: '980px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1920px',
};

const media = {
  xxs: (...args: any) => css`
  @media (max-width: ${device.xxs}) {
    ${css(...args as [Styles<object>])};
  }
`,
  xs: (...args: any) => css`
    @media (max-width: ${device.xs}) {
      ${css(...args as [Styles<object>])};
    }
  `,
  sm: (...args: any) => css`
    @media (max-width: ${device.sm}) {
      ${css(...args as [Styles<object>])};

    }
  `,
  md: (...args: any) => css`
    @media (max-width: ${device.md}) {
      ${css(...args as [Styles<object>])};

    }
  `,
  lg: (...args: any) => css`
    @media (max-width: ${device.lg}) {
      ${css(...args as [Styles<object>])};

    }
  `,
  xl: (...args: any) => css`
    @media (max-width: ${device.xl}) {
      ${css(...args as [Styles<object>])};

    }
  `,
  xxl: (...args: any) => css`
    @media (max-width: ${device.xxl}) {
      ${css(...args as [Styles<object>])};

    }
  `,
};

export default media;
