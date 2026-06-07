import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  
  min-height: 100vh;

  header {
    margin-bottom: 40px;
    h1 {
      font-size: 2.2rem;
      color: #fff;
      margin-bottom: 8px;
    }
    p {
      color: #888; // Cinza suave para o subtítulo
    }
  }
`;

export const GridPedidos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

interface CardProps {
  status: "pendente" | "enviado";
}

export const OrderCard = styled.div<CardProps>`
  background: #1c1c1c; // Cinza escuro dos cards do seu dashboard
  border: 1px solid #333;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  // Barra lateral colorida para status
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    height: 60%;
    width: 4px;
    background-color: ${props => props.status === "enviado" ? "#2ecc71" : "#e74c3c"};
    border-radius: 0 4px 4px 0;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .id {
      color: #666;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .badge {
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 4px;
      
      &.pendente {
        color: #ff9f43;
        background: rgba(255, 159, 67, 0.1);
      }

      &.enviado {
        color: #2ecc71;
        background: rgba(46, 204, 113, 0.1);
      }
    }
  }

  .info-section {
    margin-bottom: 20px;
    h3 {
      color: #fff;
      font-size: 1.25rem;
      margin-bottom: 10px;
    }
    p {
      color: #ccc;
      font-size: 0.9rem;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .details-section {
    border-top: 1px solid #333;
    padding-top: 15px;
    margin-bottom: 20px;

    h4 {
      color: #888;
      font-size: 0.8rem;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    ul {
      list-style: none;
      li {
        color: #eee;
        font-size: 0.85rem;
        padding: 4px 0;
        display: flex;
        justify-content: space-between;
      }
    }

    .total-order {
      margin-top: 15px;
      text-align: right;
      color: #e74c3c; // Laranja/Vermelho de destaque do seu tema
      font-weight: bold;
      font-size: 1.1rem;
    }
  }

  .time-section {
    margin-top: auto;
    p {
      color: #666;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
    }
  }

  .action-btn {
    margin-top: 20px;
    background: ${props => props.status === "enviado" ? "#333" : "#e74c3c"};
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.2);
    }
  }
`;