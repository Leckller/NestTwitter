import styled from 'styled-components';
import media from '../../utils/media';

export const StyledFooter = styled.footer`
  visibility: hidden;
  position: absolute;

  ${media.md`
    visibility: visible;

    justify-content: space-around;
    max-width: 600px;
    width: 100%;
    min-height: 5vh;
    position: fixed;
    display: flex;
    padding: 8px;
    bottom: 0;

    backdrop-filter: blur(2px);
    background-color: rgba(0,0,0,0.2);
  `}
`;
