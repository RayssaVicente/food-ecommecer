"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react' // Adicionei useEffect
import { Product } from '../interfaces/Product'
import { CustomerData } from '../interfaces/CustomerData' 
import { PaymentData } from '../interfaces/PaymentData'

import {CartItem} from '../interfaces/CartItem'
import { processCheckout } from '@/services/api'

import toast from 'react-hot-toast';

interface CartContextData {
  cart: CartItem[]
  addProduct: (product: Product) => void,
  subtotal: number,
  removeProduct: (productId: number) => void
  deleteProduct: (productId: number) => void
  payOrder: (customer: CustomerData, payment: any) => Promise<void>
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // --- LOG PARA O CONSOLE ---
  useEffect(() => {
    console.log('Carrinho atualizado:', cart)
  }, [cart]) 
  

  function addProduct(product: Product) {
    setCart(state => {
      const productExists = state.find(item => item.id === product.id)

      if (productExists) {
        return state.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1, subtotal: item.price * (item.quantity + 1) } : item
        )
      }

      return [...state, { ...product, quantity: 1, subtotal: product.price * 1 }]
    })
    
    // Opcional: remover o alert se o console já estiver te ajudando
    console.log(`Produto adicionado: ${product.name}`)
  }

  // Adicione estas funções antes do return
  function removeProduct(productId: number) {
    setCart(state => state.map(item => 
      item.id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1, subtotal: item.price * (item.quantity - 1) } 
        : item
    ))
  }

  function deleteProduct(productId: number) {
    setCart(state => state.filter(item => item.id !== productId))
  }

  
  function clearCart() {
    setCart([])
  }

  async function payOrder(customer: CustomerData, payment: PaymentData) {
  try {
    // Agora passamos os dois objetos separados para o serviço
    const response = await processCheckout(cart, customer, payment);

    // Verifique se a estrutura da resposta está correta
    if (response?.data?.status !== 'PAID') {
      toast.error('Pagamento recusado. Verifique os dados do cartão.');
      return;
    }

    toast.success('Pedido enviado com sucesso!');
    clearCart();

  } catch (error) {
    console.error('Erro detalhado no checkout:', error);
    toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
  }
}

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

 return (
    <CartContext.Provider value={{ cart, addProduct, subtotal, removeProduct, deleteProduct, payOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)