import styled from 'styled-components';

export const StyledSinglePost = styled.article`

  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid black;

  section:nth-child(1) {
    
    // Imagem do usuário
    img {
      width: 50px;
      height: 50px;
      border-radius: 99999px;
    }

  }

  // Configuração geral dos articles

  article {
    min-height: 30px;
  }

  section:nth-child(2) {
    
    // Nome do usuário
    button article:nth-child(1) {

      display: flex;
      gap: 8px;

    }

    // Texto do post
    button article:nth-child(2) {

      word-break: keep-all;
      text-align: start;

    }
    
    // Parte dos comentários e likes
    article {

      display: flex;
      gap: 8px;
      button {
        display: flex;
        align-items: center;
        justify-content: start;
      }

    }


  }

`;
