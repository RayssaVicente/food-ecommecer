import styled from 'styled-components';

export const AdminContainer = styled.div`
  background: #121212;
  min-height: 100vh;
  /* Ajuste este padding se a sua sidebar vermelha lateral estiver fixa */
  padding: 40px 40px 40px 40px; 
  color: white;
  font-family: 'Inter', sans-serif;

  main {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const HeaderAdmin = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;

  .logo {
    display: flex;
    align-items: center;
    gap: 15px;

    img { 
      width: 45px; 
      filter: invert(75%) sepia(82%) saturate(452%) hue-rotate(354deg) brightness(101%) contrast(101%);
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;

      span { 
        font-size: 1.2rem; 
        font-weight: bold; 
        color: white;
      }

       
    }
  }

  .admin-badge {
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
`;

export const Card = styled.div`
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px; // Garante que todos os cards tenham a mesma altura
  transition: transform 0.2s ease;

  &:hover {
    border-color: #444;
    transform: translateY(-2px);
  }
  
  label {
    color: #888;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 10px;
  }

  .value {
    font-size: 2.8rem;
    font-weight: bold;
    color: white;
    line-height: 1;
    margin-bottom: 15px;

    &.vendas { color: #ffcc00; }
    &.pendentes { color: #e74c3c; }
  }

  /* Estilização do Link (Botão Ver Pedidos) */
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: auto;
    padding: 10px;
    background: rgba(231, 76, 60, 0.1);
    border: 1px solid rgba(231, 76, 60, 0.3);
    border-radius: 8px;
    color: #e74c3c;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: bold;
    transition: all 0.2s ease;

    &:hover {
      background: #e74c3c;
      color: white;
      border-color: #e74c3c;
    }

    svg {
      /* Ajuste para o ícone de soma ou seta */
      width: 18px;
      height: 18px;
    }
  }
`;

export const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;

  th {
    text-align: left;
    background: #222;
    color: #ffcc00;
    padding: 20px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  td {
    padding: 20px;
    border-bottom: 1px solid #333;
    color: #ccc;
    
    strong { color: white; font-size: 1rem; }
  }

  .category-tag {
    background: #e74c3c;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

export const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;

  a {
    background: #e74c3c; /* Vermelho do seu modelo */
    color: white;
    text-decoration: none;
    padding: 15px 25px;
    border-radius: 12px;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      filter: brightness(1.1);
      box-shadow: 0 15px 25px rgba(231, 76, 60, 0.2);
    }
  }
`;