"use client"
import { useEffect, useState } from 'react';
import { useSnack } from './contexts/SnackContext'; // Importe o hook
import { Sidebar } from './components/Sidebar/Sidebar';
import { ProductContent } from './components/ProductContent/ProductContent';
import * as S from './style';

export default function ProductsPage() {
  const { products, isLoading, fetchProducts } = useSnack();
  const [selectedCategory, setSelectedCategory] = useState('hamburgers');

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <S.Container>
      <Sidebar 
        activeCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      {isLoading ? (
        <S.LoadingContainer>
          <div className="spinner"></div>
          <p>Carregando delícias...</p>
        </S.LoadingContainer>
      ) : (
        <ProductContent 
          title={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} 
          products={products} 
        />
      )}
    </S.Container>
  );
}