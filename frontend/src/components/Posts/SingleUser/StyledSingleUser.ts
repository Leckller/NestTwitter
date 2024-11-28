import styled from "styled-components";

export const StyledSingleUser = styled.article`

  padding: 8px;
  gap: 8px;
  border-bottom: black solid 1px;
  display: flex;
  align-items: center;  

  section:nth-child(1) {
    
    // Imagem do usuário
    img {
      width: 50px;
      height: 50px;
      border-radius: 99999px;
    }

  }

  section:nth-child(2) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;  

    h2 {
      font-size: 1rem;
    }
    h3 {
      font-size: .9rem;
      color: gray;
    }
    h3:before {
      content: '@';
    }

    button {
      border: black solid 1px;
      padding: 8px;
      border-radius: 16px;
    }

  }

`;