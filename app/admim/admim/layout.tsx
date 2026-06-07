"use client";
import * as S from "./style";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.AdminContainer>
      <S.HeaderAdmin>
        <div className="logo">
          {/* Se o ícone for o mesmo do cliente, use o mesmo caminho */}
          <img src="/icons/logo.png" alt="Logo" /> 
          <div className="brand-text">
            <span>Food Ecommerce</span>
            
          </div>
        </div>

        
        
        <div className="admin-badge">
          Painel do Estabelecimento
        </div>
      </S.HeaderAdmin>

      {/* O children aqui é o que faz as páginas (Dashboard/Produtos) aparecerem abaixo do topo */}
      <main>
        {children}
      </main>
    </S.AdminContainer>
  );
}