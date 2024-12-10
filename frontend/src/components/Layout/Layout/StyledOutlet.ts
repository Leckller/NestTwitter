import styled from "styled-components";
import media from "../../../utils/media";

export const StyledOutlet = styled.div`

  width: 100%;
  display: flex;
  max-width: 1300px;
  justify-content: center;

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


`