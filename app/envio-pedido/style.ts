import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;

  header {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .back-link {
      color: #e74c3c;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s;

      &:hover {
        color: #c0392b;
      }
    }

    h1 {
      font-size: 2.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const FormSection = styled.form`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    margin-bottom: 1rem;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: bold;
      color: #ccc;
    }

    input {
      background: #2a2a2a;
      border: 1px solid #444;
      padding: 12px;
      border-radius: 8px;
      color: white;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #e74c3c;
      }
    }
  }

  .submit-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.2s, transform 0.1s;

    &:hover {
      background-color: #c0392b;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

export const SummarySection = styled.aside`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 2rem;

  h2 {
    margin-bottom: 1.5rem;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 0.5rem;

    /* Scrollbar customizada */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 3px;
    }
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #333;
    color: #ccc;
  }

  .total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #e74c3c;
    padding-top: 1.5rem;
    font-size: 1.3rem;

    .total-value {
      color: #e74c3c;
    }
  }





`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;      /* Cor vermelha para o erro */
  font-size: 0.75rem;   /* Fonte menor para não quebrar o layout */
  margin-top: 4px;     /* Espaçamento entre o input e o erro */
  font-weight: 500;
  display: block;      /* Garante que ele fique abaixo do input */
`;