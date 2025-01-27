import styled from "styled-components";
import media from "../../../utils/media";

export const StyledEditProfile = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .bg {
    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  section {
    position: absolute;
    background-color: white;
    flex-direction: column;
    display: flex;
    
    ${media.sm`
      width: 100%;
      height: 100%;
    `}

    z-index: 20;
    width: 80%;
    height: 80%;
    max-width: 600px;
    max-height: 80vh;
    min-height: 400px;
    margin-top: 50px;
    gap: 8px;

    button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {

        .editable {
          position: absolute;
          visibility: visible;
          display: flex;
        }
        
      }

      .editable {
        position: absolute;
        visibility: hidden;
        position: absolute;
        display: none;
        width: 40px;
        height: 40px;
        z-index: 21;
        background-color: white;
        border-radius: 9999px;
        padding: 4px;
      }

      img {
        max-width: 100%;
      }
      
    }

  }

`