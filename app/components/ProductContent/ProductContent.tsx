"use client"
import { useCart } from '../../contexts/CartContext' 
import { Product } from '../../interfaces/Product' 
import * as S from '../../style' 
import Link from 'next/link'
import { showAddProductToast } from '../MensageAlimentos/MensageAlimentos' // Importe a função aqui

interface ProductContentProps {
  title: string
  products: Product[]
}

export function ProductContent({ title, products }: ProductContentProps) {
  const { addProduct, cart } = useCart()

  
 const handleAddProduct = (product: Product) => {
    addProduct(product); 
   
    showAddProductToast(product.name, product.category); 
  };

  return (
    <S.Container>
      <header>
        <div className="logo">
           <img src="/icons/logo.png" alt="Logo" />
           <span>Food Ecommerce</span>
        </div>
        <h1>{title}</h1>
      </header>

      <S.ProductGrid>
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id)
          const quantity = cartItem ? cartItem.quantity : 0

          return (
            <S.Card key={product.id}>
              <S.ImageContainer>
                {quantity > 0 && (
                  <S.Badge>
                    {quantity}
                  </S.Badge>
                )}
                <img src={product.image} alt={product.name} />
              </S.ImageContainer>

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
              <div className="footer">
                <div>
                  <strong>
                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                
                {/* Chamando a função handleAddProduct no clique */}
                <button type="button" onClick={() => handleAddProduct(product)}>
                  +
                </button>
              </div>
            </S.Card>
          )
        })}
      </S.ProductGrid>

      <Link href="/meus-pedidos" style={{ textDecoration: 'none' }}>
        <button 
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '100px',
            zIndex: 1000,
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Meu Pedido
        </button>
      </Link>
    </S.Container>
  )
}