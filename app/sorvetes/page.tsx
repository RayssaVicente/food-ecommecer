"use client"
import { useEffect } from 'react';
import { useSnack } from '../contexts/SnackContext';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ProductContent } from '../components/ProductContent/ProductContent';
import * as S from '../style';

export default function SorvetesPage() {
  const { products, isLoading, fetchProducts } = useSnack();

  useEffect(() => {
    fetchProducts('sorvetes');
  }, []);

  return (
    <S.Container>
      <Sidebar activeCategory="sorvetes" />

      {isLoading ? (
        <S.LoadingContainer>
          <div className="spinner"></div>
          <p>Buscando sobremesas...</p>
        </S.LoadingContainer>
      ) : (
        <ProductContent 
          title="Sorvetes" 
          products={products} 
        />
      )}
    </S.Container>
  );
}