import styled from 'styled-components';
import media from '../../../utils/media';

export const StyledNewPost = styled.button`
  position: fixed;
  background-color: black;
  color: white;
  z-index: 99999;
  bottom: 100px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 9999px;

  ${media.md`
    bottom: 50px;
    right: 20px;
  `}
`;
