import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  background: #121212;
  min-height: 100vh;
  padding: 40px;
  color: white;
  font-family: 'Inter', sans-serif;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px; /* Reduzido para aproximar do título */
    width: 100%;

    h1 {
      font-size: 2.2rem;
      font-weight: bold;
      margin: 0;
      
      span {
        color: #e74c3c;
      }
    }
  }

  section {
    margin-bottom: 40px;
    
    h2 {
      color: #ffcc00;
      text-transform: uppercase;
      font-size: 1.2rem;
      letter-spacing: 2px;
      border-bottom: 1px solid #333;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
  }
`;

// --- NOVO: GRID E CARDS ---

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const Card = styled.div`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s;

  &:hover {
    transform: translateY(-5px);
    border-color: #e74c3c;
  }

  h3 {
    color: white;
    font-size: 1.3rem;
    margin: 10px 0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 15px;

    strong {
      color: #fff;
      font-size: 1.4rem;
    }

    .actions {
      display: flex;
      gap: 10px;

      button {
        background: #333;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s;

        &:hover { filter: brightness(1.3); }
        &.delete:hover { background: #e74c3c; }
      }
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  background: #111;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    color: #444;
    font-size: 0.8rem;
  }
`;

// --- COMPONENTES DE SUPORTE (MODAIS E BOTÕES) ---

export const AddButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

export const Overlay = styled.div`
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
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #333;
  width: 90%;
  max-width: 500px;

  h2 { margin-bottom: 20px; color: white; text-align: center; }
  p { color: #ccc; text-align: center; margin-bottom: 20px;}

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    label { font-size: 0.85rem; color: #888; margin-bottom: -10px; }

    input, select {
      background: #222;
      border: 1px solid #333;
      padding: 12px;
      border-radius: 8px;
      color: white;
      &:focus { border-color: #e74c3c; outline: none; }
    }
  }

  .image-preview {
    width: 100%;
    height: 150px;
    background: #111;
    border: 2px dashed #333;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .modal-actions {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    button { flex: 1; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .confirm { background: #e74c3c; color: white; border: none; }
    .cancel { background: transparent; color: white; border: 1px solid #444; }
  }
`;