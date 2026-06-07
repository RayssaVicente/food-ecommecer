import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  header {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .back-link {
      color: #e74c3c;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
      &:hover { color: #c0392b; }
    }

    h1 {
      font-size: 2.2rem;
      text-transform: uppercase;
      @media (max-width: 768px) { font-size: 1.8rem; }
    }
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr; /* Empilha o formulário e o resumo */
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

  @media (max-width: 768px) { padding: 1.5rem; }

  h2 {
    margin-top: 1rem;
    font-size: 1.3rem;
    color: #ffcc00;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }

  .row {
    display: flex;
    gap: 15px;
    @media (max-width: 600px) { flex-direction: column; gap: 1.5rem; }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;

    label { font-weight: bold; color: #888; font-size: 0.9rem; }

    input, select {
      background: #2a2a2a;
      border: 1px solid #444;
      padding: 12px;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      &:focus { border-color: #e74c3c; outline: none; }
    }

    select { cursor: pointer; height: 48px; }
  }

  .submit-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 18px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 1rem;
    transition: 0.2s;
    &:hover { background-color: #c0392b; transform: translateY(-2px); }
  }
`;

export const SummarySection = styled.aside`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) { position: static; }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
    max-height: 400px;
    overflow-y: auto;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #333;
    
    .info {
      span { display: block; font-size: 0.9rem; color: #888; }
    }
  }

  .total-container {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #e74c3c;
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: bold;
    .total-value { color: #e74c3c; }
  }
`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: 500;
`;

// No seu style.ts
export const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background: #1a1a1a;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #ff4d4d;
    max-width: 400px;

    h2 { color: #fff; margin-bottom: 1rem; }
    p { color: #ccc; margin-bottom: 1.5rem; }
    
    button {
      background: #ff4d4d;
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      &:hover { background: #e64545; }
    }
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid #ff4d4d;
  text-align: center;
  max-width: 400px;
  width: 90%;

  .icon {
    font-size: 50px;
    margin-bottom: 20px;
  }

  h2 {
    color: #fff;
    margin-bottom: 15px;
  }

  p {
    color: #ccc;
    margin-bottom: 10px;
    strong { color: #ff4d4d; }
  }

  button {
    margin-top: 25px;
    background: #ff4d4d;
    color: #fff;
    border: none;
    padding: 12px 40px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;