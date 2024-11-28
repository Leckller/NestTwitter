import styled from 'styled-components';
import media from '../../utils/media';

export const StyledLogin = styled.main`

  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;

  button {
    cursor: pointer;
  }

  div {
    border-radius: 400px 201px 400px 201px;
      -webkit-border-radius: 400px 201px 400px 201px;
      -moz-border-radius: 400px 201px 400px 201px;

    ${media.sm`
      min-width: 400px;
      min-height: 400px;
      border-radius: 250px 151px 250px 151px;
        -webkit-border-radius: 250px 151px 250px 151px;
        -moz-border-radius: 250px 151px 250px 151px;
    `}

    border: solid black 2px;
    min-width: 600px;
    min-height: 600px;
  }

  div {
    animation: PR1 20s infinite;
    background-color: rgb(102, 0, 0);
  }

  div div{
    animation: PL1 15s infinite;
    background-color: #800000;
  }

  div div div {
    animation: PR1 10s infinite;
    background-color: #990000;
  }

  div div div div{
    animation: PL1 5s infinite;
    background-color: #b30000;
  }

  div div div div div{
    animation: none;
    background-color: #cc0000;
  }

  form {

    position: absolute;
    z-index: 9999;
    background-color: #ff0000;
    padding: 64px;
    border-radius: 9999px;
    width: 300px;
    height: 300px;

    ${media.xxs`
      width: 100%;
      label {
        width: 100%;
      }
      input {
        width: 100%;
      }
    `}

    border: 10px solid #e60000;

  }

  @keyframes PR1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes PL1 {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

`;
