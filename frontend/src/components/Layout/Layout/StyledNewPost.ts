import styled from 'styled-components';
import media from '../../../utils/media';

export const StyledNewPost = styled.button`
  position: absolute;
  visibility: hidden;

  ${media.md`
    visibility: visible;
    bottom: 50px;
    right: 20px;
    position: fixed;
    background-color: black;
    color: white;
    z-index: 99999;
    width: 50px;
    height: 50px;
    border-radius: 9999px;

  `}
`;
