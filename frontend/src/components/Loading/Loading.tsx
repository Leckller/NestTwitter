import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled from 'styled-components';

const StyledArticle = styled.article`

  animation: 1s rotate ease-in-out infinite;
  color: black;
  font-weight: bolder;
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    } 100% {
      transform: rotate(360deg);
    }
  }

`;

function Loading() {
  return (
    <StyledArticle>
      <AiOutlineLoading3Quarters />
    </StyledArticle>
  );
}

export default Loading;
