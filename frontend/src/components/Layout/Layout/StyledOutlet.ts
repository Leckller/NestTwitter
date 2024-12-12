import styled from "styled-components";
import media from "../../../utils/media";

export const StyledOutlet = styled.div`

  width: 100%;
  display: flex;
  max-width: 1300px;
  gap: 16px;
  justify-content: center;
  position: relative;

  aside {
    visibility: visible;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;

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
  
  aside:nth-child(1) {
    position: relative;
  }

  aside:nth-child(1) section {
    position: fixed;
    min-width: 200px;
  }

  aside:nth-child(3) {

    padding: 8px;

  }


  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

`