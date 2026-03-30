import { Sidebar } from './components/Sidebar/Sidebar'
import type { Metadata } from 'next'
import { SnackProvider } from './contexts/SnackContext' // 1. Importe seu Provider
import { CartProvider } from './contexts/CartContext'
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Food Ecommerce | O melhor hambúrguer',
  description: 'Sistema de pedidos de comida online',
  icons: {
    icon: '/icons/logo.png',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, background: '#111', color: 'white' }}>
        <SnackProvider> 
          <CartProvider> 
            <div style={{ display: 'flex' }}>
              
              <main style={{ flex: 1 }}>
                {children}
              </main>
            </div>
            <Toaster 
              position="bottom-center" 
              reverseOrder={false} 
              gutter={8}
            />
          </CartProvider>
          
        </SnackProvider>
      </body>
    </html>
  )
}