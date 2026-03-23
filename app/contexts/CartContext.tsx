"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react' // Adicionei useEffect
import { Product } from '../interfaces/Product'

interface CartItem extends Product {
  quantity: number
}

interface CartContextData {
  cart: CartItem[]
  addProduct: (product: Product) => void,
  totalAmount: number,
  removeProduct: (productId: number) => void
  deleteProduct: (productId: number) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // --- LOG PARA O CONSOLE ---
  useEffect(() => {
    console.log('Carrinho atualizado:', cart)
  }, [cart]) // Sempre que 'cart' mudar, ele executa
  // --------------------------

  function addProduct(product: Product) {
    setCart(state => {
      const productExists = state.find(item => item.id === product.id)

      if (productExists) {
        return state.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...state, { ...product, quantity: 1 }]
    })
    
    // Opcional: remover o alert se o console já estiver te ajudando
    console.log(`Produto adicionado: ${product.name}`)
  }

  // Adicione estas funções antes do return
  function removeProduct(productId: number) {
    setCart(state => state.map(item => 
      item.id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ))
  }

  function deleteProduct(productId: number) {
    setCart(state => state.filter(item => item.id !== productId))
  }

  

  

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

 return (
    <CartContext.Provider value={{ cart, addProduct, totalAmount, removeProduct, deleteProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)