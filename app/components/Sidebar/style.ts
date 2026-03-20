import styled from 'styled-components'

interface ContainerProps {
  isMenuOpen: boolean;
}

export const Container = styled.aside<ContainerProps>`
  background-color: #b73939;
  width: ${({ isMenuOpen }) => (isMenuOpen ? '220px' : '100px')};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ isMenuOpen }) => (isMenuOpen ? 'flex-start' : 'center')};
  transition: width 0.3s ease;
  z-index: 1000;

  /* --- DESKTOP --- */
  .botao-menu {
    padding: 20px 0;
    background: none;
    border: none;
    cursor: pointer;
    padding-left: ${({ isMenuOpen }) => (isMenuOpen ? '1.5rem' : '0')};
    
    img {
      width: 40px;
      filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
    }
  }

  nav {
    flex: 1;
    width: 100%;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem 0;
    }
  }

  a {
    display: flex;
    flex-direction: ${({ isMenuOpen }) => (isMenuOpen ? 'row' : 'column')};
    align-items: center;
    padding: 0 1.5rem;
    text-decoration: none;
    color: white;
    gap: 1.5rem;

    span {
      display: ${({ isMenuOpen }) => (isMenuOpen ? 'inline' : 'none')};
      white-space: nowrap;
      font-size: 1.1rem;
    }

    &.active {
      border-right: 4px solid #ffcc00;
    }
  }

  img {
    width: 40px;
    height: 40px;
    filter: brightness(0) invert(1);
  }

  /* --- MOBILE (320px até 768px) --- */
  @media (max-width: 768px) {
    width: 100%;
    height: 4.5rem;
    top: auto; /* Solta do topo */
    bottom: 0; /* Fixa no rodapé */
    flex-direction: row;
    padding: 0;
    

    .botao-menu {
      display: none;
    }

    nav {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;

      ul {
        flex-direction: row;
        justify-content: space-evenly; /* Centraliza e distribui icones automaticamente */
        align-items: center;
        padding: 0;
        margin: 0;
        width: 100%;
        gap: 0;
      }
    }

    li {
      flex: 1; /* Faz cada ícone ocupar o mesmo espaço na largura */
      display: flex;
      justify-content: center;

      a {
        padding: 0.5rem;
        flex-direction: column;
        gap: 0;
        width: 100%;
        justify-content: center;
        
        &.active {
          border-right: none;
          border-bottom: 4px solid #ffcc00; /* Linha amarela embaixo no mobile */
        }

        span {
          display: none; /* Esconde texto em qualquer celular */
        }
      }

      img {
        width: 2.2rem;
        height: 2.2rem;
      }
    }
  }
`