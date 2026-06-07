"use client"
import { useEffect } from 'react';
import { useSnack } from '../contexts/SnackContext';
import { Sidebar } from '../components/Sidebar/Sidebar'; 
import { ProductContent } from '../components/ProductContent/ProductContent';
import * as S from '../style';

export default function PizzasPage() {
  const { products, isLoading, fetchProducts } = useSnack();

  useEffect(() => {
    fetchProducts('pizzas'); 
  }, []);

  return (
    <S.Container>
      <Sidebar activeCategory="pizzas" />

      {isLoading ? (
        <S.LoadingContainer>
          <div className="spinner"></div>
          <p>Carregando pizzas artesanais...</p>
        </S.LoadingContainer>
      ) : (
        <ProductContent 
          title="Pizzas" 
          products={products} 
        />
      )}
    </S.Container>
  );
}