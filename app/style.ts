import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  
  /* Ajustado: padding-top menor (1rem) e padding-left mais justo (80px + 1.5rem) */
  padding: 1rem 1.5rem 2rem calc(80px + 1.5rem); 

  @media (max-width: 768px) {
    margin-left: 0 !important; 
    padding: 1rem;
    padding-bottom: 12rem; 
    display: flex;
    flex-direction: column;
    align-items: center; 
  }

  header {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 1.5rem; /* Reduzido de 3rem para 1.5rem */

    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem; /* Reduzido de 2rem para 0.5rem para colar no H1 */

      @media (max-width: 768px) {
        justify-content: center;
      }

      img {
        width: 35px; /* Reduzi levemente a logo */
        filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
      }

      span {
        font-size: 1.2rem; /* Reduzi levemente o texto da logo */
        font-weight: bold;
        color: white;
      }
    }

    h1 {
      font-size: 1.8rem; /* Reduzi de 2rem para 1.8rem */
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 0; /* Garante que não haja espaço extra acima */

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
  margin: 0; /* Alinhado à esquerda para acompanhar o cabeçalho */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem; /* Reduzi de 2.5rem para 1.5rem para os cards ficarem mais próximos */

  @media (max-width: 768px) {
    grid-template-columns: minmax(250px, 400px); 
    justify-content: center;
    gap: 1.5rem;
  }
`;

// Mantenha os outros componentes (Card, Badge, ImageContainer) como estão, 
// pois eles já funcionam bem. Apenas o Container, Header e Grid causavam o afastamento.

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Card = styled.div`
  background: #1a1a1a;
  padding: 1rem; /* Reduzi levemente o padding interno */
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
  border: 1px solid #222;

  &:hover {
    transform: translateY(-5px);
    border-color: #e03131;
  }

  h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  img {
    width: 100%;
    height: 160px; /* Altura fixa para manter o alinhamento */
    object-fit: cover; /* Melhor que contain para preencher o espaço */
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  p {
    color: #ccc;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
    flex-grow: 1;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: white;
      font-size: 1.2rem;
    }

    button {
      background: #e03131;
      color: white;
      border: none;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;

      &:hover {
        background: #b72b2b;
      }
    }
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: 5px;
  background-color: #e03131;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  border: 2px solid #1a1a1a;
  z-index: 2;
`;

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: #fff;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333;
    border-top: 4px solid #e03131;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
    margin-bottom: 1rem;
  }
`;