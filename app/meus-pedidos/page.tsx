"use client"
import { useCart } from '../contexts/CartContext' 
import * as S from './style' 
import { useRouter } from 'next/navigation'

import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

export default function MyCart() {
  const { cart, addProduct, removeProduct, deleteProduct } = useCart()

  const router = useRouter()
  const handleGoToCheckout = () => {
    router.push('/envio-pedido') // Faz a navegação
  }

  // Cálculo do total geral
  const totalGeral = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <S.CartContainer>
      <header>
       
        <div className="logo">
            <img src="/icons/logo.png" alt="Logo" />
            <div className="brand-text">
                <span>Food Commerce</span>
               
            </div>
        </div>
       
      
        
        <div className="cart-header-info">
          <div>
            <h2>Meus pedidos</h2>
            <p>{cart.length.toString().padStart(2, '0')} lanches</p>
          </div>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
             <circle cx="9" cy="21" r="1"></circle>
             <circle cx="20" cy="21" r="1"></circle>
             <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      </header>

      <S.Table>
        <thead>
          <tr>
            <th></th>
            <th>LANCHE</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="product-img" />
              </td>
              <td>
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <strong>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </div>
              </td>
              <td>
                <div className="quantity-controls">
                  <button onClick={() => removeProduct(item.id)}><FaMinusCircle /></button>
                  <span>{item.quantity.toString().padStart(2, '0')}</span>
                  <button onClick={() => addProduct(item)}><FaPlusCircle /></button>
                </div>
              </td>
              <td>
                <strong className="subtotal">
                  R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteProduct(item.id)}>
                  <FaTrashAlt color="#ffcc00" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      <footer className="cart-footer">
        <div className="total-container">
          <span>TOTAL</span>
          <strong>R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <button 
          className="finish-btn" 
          onClick={handleGoToCheckout}
        >
          Finalizar Pedido
        </button>
      </footer>
    </S.CartContainer>
  )
}