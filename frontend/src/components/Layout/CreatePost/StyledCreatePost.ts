import styled from 'styled-components';

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

    section {
      display: flex;
      justify-content: end;

      button {
        padding: 4px;
        border: solid black 1px;
        border-radius: 8px;
      }
    }

    textarea {
      resize: none;
      width: 100%;
      height: 100%;
      min-height: 200px;
      border: none;
      outline: none;
    }

  }
`;
