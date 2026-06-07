"use client"
import { useEffect } from 'react';
import { useSnack } from '../contexts/SnackContext';
import { Sidebar } from '../components/Sidebar/Sidebar'; 
import { ProductContent } from '../components/ProductContent/ProductContent';
import * as S from '../style';

export default function DrinksPage() {
  const { products, isLoading, fetchProducts } = useSnack();

  useEffect(() => {
    // Basta chamar a função do contexto passando a slug correta do seu db.json
    fetchProducts('drinks'); 
  }, []);

  return (
    <S.Container>
      <Sidebar activeCategory="drinks" />

      {isLoading ? (
        <S.LoadingContainer>
          <div className="spinner"></div>
          <p>Carregando bebidas geladinhas...</p>
        </S.LoadingContainer>
      ) : (
        <ProductContent 
          title="Refrigerantes e Sucos" 
          products={products} 
        />
      )}
    </S.Container>
  );
}