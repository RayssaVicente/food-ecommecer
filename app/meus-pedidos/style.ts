import styled from 'styled-components';

export const CartContainer = styled.div`
  background: #121212;
  min-height: 100vh;
  padding: 40px 40px 40px 140px; 
  color: white;
  display: flex;
  flex-direction: column;

  /* Responsividade do Container */
  @media (max-width: 1024px) {
    padding: 30px 30px 30px 100px;
  }

  @media (max-width: 768px) {
    padding: 20px; /* Remove o espaço da sidebar lateral no mobile */
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;

      img { 
        width: 45px; 
        filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
      }

      .brand-text span { 
        font-size: 1.5rem; 
        font-weight: bold; 
      }
    }

    .cart-header-info {
      display: flex;
      align-items: center;
      gap: 20px;
      
      div {
        text-align: right;
        @media (max-width: 768px) { text-align: center; }
        h2 { font-size: 1.8rem; }
        p { color: #ffcc00; font-weight: bold; }
      }
      
      svg { width: 35px; height: 35px; }
    }
  }

  .cart-footer {
    margin-top: auto; 
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #333;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }

    .total-container {
      display: flex;
      align-items: baseline;
      gap: 20px;
      span { color: #888; font-size: 1.1rem; }
      strong { font-size: 2.2rem; color: white; }
    }

    .finish-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 15px 40px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      width: auto;

      @media (max-width: 768px) {
        width: 100%; /* Botão ocupa largura total no mobile */
      }
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;

  /* Esconde o cabeçalho da tabela no mobile */
  @media (max-width: 768px) {
    thead { display: none; }
    
    tbody tr {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #1a1a1a;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 15px;
      position: relative;
    }
  }

  th {
    text-align: left;
    color: #888;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
  }

  td {
    padding: 25px 0;
    border-bottom: 1px solid #333;
    vertical-align: middle;

    @media (max-width: 768px) {
      border-bottom: none;
      padding: 10px 0;
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }

  .product-img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 12px;
  }

  .product-info {
    h3 { font-size: 1.4rem; color: white; margin-bottom: 5px; }
    strong { color: #888; font-weight: normal; }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    
    button {
      background: none;
      border: none;
      color: #ffcc00;
      font-size: 1.8rem;
      cursor: pointer;
    }

    span {
      background: white;
      color: black;
      padding: 5px 15px;
      border-radius: 6px;
      font-weight: bold;
      min-width: 45px;
      text-align: center;
    }
  }

  .subtotal {
    font-size: 1.5rem;
    color: white;
    @media (max-width: 768px) {
      &::before { content: 'Subtotal: '; font-size: 1rem; color: #888; }
    }
  }

  .delete-btn {
    @media (max-width: 768px) {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
`;