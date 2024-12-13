import styled from 'styled-components';
import media from '../../../utils/media';

export const StyledNewPost = styled.button`
  position: absolute;
  visibility: hidden;

  ${media.md`

    visibility: visible;
    
    bottom: 50px;
    right: 20px;
    width: 50px;
    height: 50px;
    
    position: fixed;
    color: white;

    z-index: 99999;
    border-radius: 9999px;

    svg {
      width: 100%;
      height: 100%;
    }
  `}
`;
