"use client"
import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { api } from "@/services/api"

// Interface para o Produto
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface SnackContextData {
  products: Product[]
  isLoading: boolean
  fetchProducts: (category: string) => Promise<void>
}

export const SnackContext = createContext<SnackContextData>({} as SnackContextData)

export function SnackProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchProducts(category: string) {
    try {
      setIsLoading(true)
      const response = await api.get<Product[]>(`/products?category=${category}`)
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SnackContext.Provider value={{ products, isLoading, fetchProducts }}>
      {children}
    </SnackContext.Provider>
  )
}

// Hook personalizado para facilitar o uso
export const useSnack = () => useContext(SnackContext)