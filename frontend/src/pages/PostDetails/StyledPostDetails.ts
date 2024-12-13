import styled from "styled-components";

export const StyledPostDetails = styled.section<{ isClicked: boolean }>`
  margin-bottom: 50px;
  width: 100%;
  form {
    display: flex;
    flex-direction: ${p => p.isClicked ? 'column' : 'row'};
    align-items: ${p => p.isClicked ? 'end' : 'center'};
    border-bottom: 1px solid black;
    gap: 8px;

    button {
      padding: 8px;
      border: solid 1px black;
      border-radius: 16px;
      margin-bottom: 8px;

      &:disabled {
        cursor: not-allowed;
      }
    }

    textarea {
      resize: none;
      width: 100%;
      padding: 8px;
      height: auto;
      overflow: hidden;
      border: none;
      outline: none;
    }
  }

`