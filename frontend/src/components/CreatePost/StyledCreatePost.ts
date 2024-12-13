import styled from 'styled-components';
import media from '../../utils/media';

export const StyledCreatePost = styled.section`
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  article {
    background-color: rgba(0,0,0,0.2);
    backdrop-filter: blur(2px);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 15;
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    min-height: 200px;
    width: 350px;
    z-index: 999;
    top: 10%;
    gap: 8px;
    border-radius: 16px;
    padding: 8px;

    ${media.sm`
      width: 90%;
      height: 90%;
    `}

    ${media.xs`
      width: 100%;
      height: 100%;
      border-radius: 0;
    `}


    // Botões
    section{
      display: flex;
      justify-content: start;

      button {
        padding: 4px;
        border-radius: 8px;
      }
      
    }

    // Botões do topo
    & section:nth-child(1) {
      ${media.sm`
        justify-content: space-between;
      `}

      // Botão Seta
      button:nth-child(1) {
        position: absolute;  
        visibility: hidden;
        ${media.sm`
          visibility: visible;
          position: static;
        `}
      }

      // Botão X
      button:nth-child(2) {
        visibility: visible;
        position: static;
        ${media.sm`
          position: absolute;  
          visibility: hidden;
        `}
      }

      // Botão Postar
      button:nth-child(3) {
        width: 100px;
        position: absolute;  
        visibility: hidden;
        background-color: lightblue;

        ${media.sm`
          visibility: visible;
          position: static;
        `}

        &:disabled {
         cursor: not-allowed;
        }

      }
    }

    // Botão de postar
    & section:nth-child(3) {
      button {
        width: 100px;
        background-color: lightblue;
        
        ${media.sm`
          position: absolute;  
          visibility: hidden;
        `}

        &:disabled {
          cursor: not-allowed;
        }
      }

    }

    textarea {
      resize: none;
      width: 100%;
      min-height: 200px;
      border: none;
      outline: none;
    }

  }
`;
