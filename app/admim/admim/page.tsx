"use client";
import * as S from "./style";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Pedido {
  id: string;
  cliente: string;
  resumo: string[];
  total: string;
  data: string;
  status?: "pendente" | "entregue"; // Opcional: caso você adicione status depois
}

export default function AdminDashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    // Busca os pedidos do seu db.json
    fetch("http://localhost:3001/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Erro ao buscar pedidos:", err));
  }, []);

  // --- LÓGICA DOS CÁLCULOS ---

  // 1. Total de Pedidos (Quantidade de itens no array)
  const totalPedidos = pedidos.length;

  // Função auxiliar para converter "Total R$ 70.50" em número 70.50
  const parseValue = (value: string) => {
    return Number(value.replace("Total R$ ", "").replace(",", "."));
  };

  // 2. Faturamento Hoje
  const hoje = new Date().toLocaleDateString("pt-BR");
  const faturamentoHoje = pedidos
    .filter((p) => p.data.includes(hoje))
    .reduce((acc, p) => acc + parseValue(p.total), 0);

  // 3. Pedidos Pendentes (Exemplo: se não tiver status "entregue", é pendente)
  const pendentes = pedidos.filter((p) => p.status !== "entregue").length;

  // 4. Faturamento do Mês
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const faturamentoMes = pedidos
    .filter((p) => {
      // Converte a string "02/04/2026, 19:39:43" para objeto Date para comparar
      const [dataParte] = p.data.split(",");
      const [dia, mes, ano] = dataParte.split("/").map(Number);
      return mes === (mesAtual + 1) && ano === anoAtual;
    })
    .reduce((acc, p) => acc + parseValue(p.total), 0);

  return (
    <>
      <header style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2rem" }}>
          Bem-vinda, <span style={{ color: "#e74c3c" }}>Rayssa!</span>
        </h1>
      </header>

      <S.StatsGrid>
        <S.Card>
          <label>Total de Pedidos</label>
          <div className="value">{totalPedidos}</div>
        </S.Card>

        <S.Card>
          <label>Total Faturado Hoje</label>
          <div className="value vendas">
            R$ {faturamentoHoje.toFixed(2).replace(".", ",")}
          </div>
        </S.Card>

        <S.Card>
          <label>Pedidos Pendentes</label>
          <div className="value pendentes">{pendentes}</div>
          <Link href="/admim/order">
            <Plus size={24} />
            Ver Pedidos 
          </Link>
        </S.Card>

        <S.Card>
          <label>Faturamento do Mês</label>
          <div className="value">
            R$ {faturamentoMes.toFixed(2).replace(".", ",")}
          </div>
        </S.Card>
      </S.StatsGrid>

      <S.FloatingButtonContainer>
        <Link href="/admim/admim/products">
          <Plus size={24} />
          Cadastrar Produtos
        </Link>
      
        
      </S.FloatingButtonContainer>
    </>
  );
}