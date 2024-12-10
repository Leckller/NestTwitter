import styled from 'styled-components';
import media from '../../utils/media';

export const StyledLogin = styled.main`

  width: 100%;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  
  button {
    cursor: pointer;
  }

  .wave {
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .tzero{
    top:0;
  }

  .bzero {
    bottom: 0;

  }

  form {
    z-index: 10;
    
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.2);

    width: 50%;
    max-width: 800px;    

    ${media.sm`
      width: 90%;
    `}
    
    min-height: 300px;
    height: 50%;
    max-height: 600px;

    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    section:nth-child(1) {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 16px;

      article {
        width: 100%;
        position: relative;

        label {
          padding: 0 5px;
          position: absolute;
          top: 50%;
          left: 1em;
          transform: translateY(-50%);
          pointer-events: none;
          transition: .3s;
        }

        input {
          width: 100%;
          border: solid black 1px;
          border-radius: 32px;
          padding: 16px;
          background-color: transparent;
          outline: none;
        }

        input:focus~label,
        input:valid~label{
          top: 0;
          background-color: white;
          border: 1px solid black;
          font-size: 0.7rem;
        }

      }

      div {
        gap: 8px;
        display: flex;
        position: relative;
        align-items: center;

        input {
          padding-right: 30px;
        }

        button {
          right: 1rem;
          position: absolute;
          transform: translateY(2px);
        }
      }

    }

    section:nth-child(2) {
      display: flex;
      flex-direction: column;
      width: 80%;
      gap: 16px;

      // Ainda não possui cadastro/login
      p {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      
      // Logar
      button {
        border: solid black 1px;
        border-radius: 32px;
        padding: 16px;
      }

    }
  }

  @keyframes textFrame {
    100% {
      transform: translate(-45px);
    }

  }

`;
