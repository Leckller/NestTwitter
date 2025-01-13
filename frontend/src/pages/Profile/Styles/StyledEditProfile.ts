import styled from "styled-components";

export const StyledEditProfile = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .bg {
    background-color: rgba(0, 0, 0, 0.41);
    backdrop-filter: blur(2px);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  section {
    position: absolute;
    background-color: white;
    max-width: 600px;
    z-index: 20;
    width: 80%;
    height: 80%;
    max-height: 80vh;
    min-height: 400px;
    margin-top: 50px;

    button {
      img {
        width: 100%;
        &:hover {
          backdrop-filter: blur(10px);
        }
      }
    }

  }

`