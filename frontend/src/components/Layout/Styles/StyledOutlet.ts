import styled from "styled-components";
import media from "../../../utils/media";

export const StyledOutlet = styled.div`

  width: 100%;
  display: flex;
  gap: 16px;
  align-items: start;
  justify-content: center;
  position: relative;

  aside, aside section {
    visibility: visible;
    display: flex;    
    width: 33%;
    flex-direction: column;
    align-items: end;

    button {
      display: flex;
      gap: 8px;
      padding: 16px;
      font-size: 1.1rem;
    }

    .postButton {
      background-color: black;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 32px;

    }

    ${media.md`
      visibility: hidden;
      position: absolute;
    `}
  }
  
  // Aside que garante o tamanho para a section dos botões
  aside:nth-child(1) {
    position: relative;
    
    ${media.md`
      position: absolute;
    `}
  }

  // Section dos botões
  aside:nth-child(1) section {

    position: fixed;
    display: flex;
    width: 200px;
    align-items: start;
  }

  aside:nth-child(3) {

    display: flex;
    align-items: start;
    padding: 8px;

  }


  div#mainDiv {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`