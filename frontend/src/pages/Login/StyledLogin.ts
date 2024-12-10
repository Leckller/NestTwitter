import styled from 'styled-components';
import media from '../../utils/media';

export const StyledLogin = styled.main`

  width: 100%;
  height: 100vh;
  display: flex;

  overflow-x: hidden;
  overflow-y: hidden;
  
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  
  button {
    cursor: pointer;
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
          border-radius: 8px;
          font-size: 0.8rem;
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
        font-size: 1.2rem;
        padding: 16px;
      }

    }
  }

  .bubble {
    border-radius: 9999px;
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 255, 0.8);
    position: absolute;
    left: 0;
    animation: ease-in-out slide 5s infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  
  .bubble:nth-child(2) {
    animation: ease-in-out slide 5s infinite reverse;
    background-color: rgba(0, 255, 0, 0.8);
  }

  @keyframes slide {
    0% {
      transform: translateX(-150px);
    }
    100% {
      transform: translateX(100vw);
    }
  }

`;
