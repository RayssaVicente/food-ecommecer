import styled from 'styled-components';

export const CartContainer = styled.div`
  background: #121212;
  min-height: 100vh;
  /* Espaço para não ficar embaixo da sidebar vermelha lateral */
  padding: 40px 40px 40px 140px; 
  color: white;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;

      img { 
        width: 50px; 
        /* Filtro dourado aplicado ao ícone */
        filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
      }

      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1;

        span { 
          font-size: 1.8rem; 
          font-weight: bold; 
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .commerce { 
          color: #e74c3c; /* Vermelho do modelo */
          font-size: 0.9rem; 
          font-weight: normal;
          margin-top: 2px;
        }
      }
    }

    .cart-header-info {
      display: flex;
      align-items: center;
      gap: 20px;
      
      div {
        text-align: right;
        h2 { font-size: 2rem; margin: 0; color: white; }
        p { color: #ffcc00; margin: 0; font-weight: bold; font-size: 1.1rem; }
      }
      
      svg { 
        width: 40px;
        height: 40px;
      }
    }
  }

  .cart-footer {
    margin-top: auto; 
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #333;

    .total-container {
      display: flex;
      align-items: baseline;
      gap: 20px;
      span { color: #888; font-size: 1.2rem; }
      strong { font-size: 2rem; color: white; }
    }

    .finish-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 10px 30px;
      border-radius: 10px;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;

  th {
    text-align: left;
    color: #888;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
  }

  td {
    padding: 25px 0;
    border-bottom: 1px solid #333;
    vertical-align: middle;
  }

  .product-img {
    width: 130px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
  }

  .product-info {
    h3 { margin: 0 0 5px 0; font-size: 1.5rem; color: white; }
    strong { color: #888; font-size: 1.1rem; font-weight: normal; }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    
    button {
      background: none;
      border: none;
      color: #ffcc00; /* Cor amarela dos controles */
      font-size: 1.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: transform 0.1s;

      &:active { transform: scale(0.9); }
    }

    span {
      background: white;
      color: black;
      padding: 5px 15px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 1.2rem;
      min-width: 45px;
      text-align: center;
    }
  }

  .subtotal {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
  }

  .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    
    &:hover { transform: scale(1.2); }
  }
`;