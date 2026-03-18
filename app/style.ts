import styled, { keyframes } from 'styled-components';

// 1. Definição da animação de rotação para o Loading
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  
  /* Desktop: Espaço para a sidebar lateral vermelha */
  padding: 2rem 2rem 2rem calc(100px + 2rem); 

  @media (max-width: 768px) {
    margin-left: 0 !important; 
    padding: 1.5rem;
    padding-bottom: 12rem; 
    display: flex;
    flex-direction: column;
    align-items: center; 
  }

  header {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 3rem;

    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        justify-content: center;
      }

      img {
        width: 40px;
        /* Filtro para deixar o ícone amarelado/dourado */
        filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
      }

      span {
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
      }
    }

    h1 {
      font-size: 2rem;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;

      @media (max-width: 768px) {
        text-align: center;
      }
    }
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(250px, 400px); 
    justify-content: center;
    gap: 2rem;
  }
`;

export const Card = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    margin-bottom: 1.5rem;
  }

  p {
    color: #ccc;
    font-size: 0.95rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    flex-grow: 1;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: white;
      font-size: 1.4rem;
    }

    button {
      background: #e03131;
      color: white;
      border: none;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      &:hover {
        background: #b72b2b;
      }
    }
  }
`;

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh; /* Ajustado para não ocupar a tela toda se estiver dentro do container */
  color: #fff;

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #333;
    border-top: 5px solid #f1f1f1;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
    margin-bottom: 1rem;
  }
`;