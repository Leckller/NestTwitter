import styled from 'styled-components';
import media from '../../../utils/media';

export const StyledHeader = styled.header<{ isBubble: string }>`
  section:nth-child(1) {
    visibility: hidden;
    position: absolute;

    ${media.md`
      visibility: visible;
      position: static;
    `}
  }

    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    top: 0;
    min-height: 5vh;
    padding: 8px;
    width: 100%;

    section:nth-child(1) {
      display: flex;
      gap: 8px;
    }
    
    section:nth-child(2) {

      display: flex;
      justify-content: space-around;
      width: 100%;

      & button:nth-child(1) {
        border-bottom: ${p => p.isBubble === 'bubble' ? '' : 'black solid 1px'}
      }
      
      & button:nth-child(2) {
        border-bottom: ${p => p.isBubble === 'bubble' ? 'black solid 1px' : ''}
      }

    }
`;
