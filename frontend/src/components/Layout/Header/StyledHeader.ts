import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: blue;
  top: 0;
  min-height: 5vh;
  padding: 8px;
  width: 100%;
  
  section:nth-child(2) {

    display: flex;
    justify-content: space-around;
    width: 100%;

  }
`;
