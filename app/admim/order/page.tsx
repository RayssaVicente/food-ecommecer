"use client";
import { useEffect, useState } from "react";
import * as S from "./style"; // Certifique-se de ter os estilos para a tabela/cards
import { CheckCircle, Clock, Truck } from "lucide-react";

interface Pedido {
  id: string;
  cliente: string;
  whatsapp: string;
  endereco: string;
  resumo: string[];
  total: string;
  data: string;
  status: "pendente" | "enviado";
  horarioSaida?: string | null;
}

export default function GerenciarPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Busca os pedidos ao carregar a página
  const fetchPedidos = async () => {
    const res = await fetch("http://localhost:3001/pedidos");
    const data = await res.json();
    // Ordenar pelos mais recentes primeiro
    setPedidos(data.reverse());
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Função para atualizar o status do pedido
  const toggleStatus = async (id: string, currentStatus: string) => {
    const novoStatus = currentStatus === "pendente" ? "enviado" : "pendente";
    const agora = novoStatus === "enviado" ? new Date().toLocaleTimeString("pt-BR") : null;

    try {
      const response = await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            status: novoStatus,
            horarioSaida: agora 
        }),
      });

      if (response.ok) {
        // Atualiza o estado local para refletir a mudança na hora
        setPedidos(pedidos.map(p => 
          p.id === id ? { ...p, status: novoStatus, horarioSaida: agora } : p
        ));
      }
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  return (
    <S.Container>
      <header>
        <h1>Gerenciamento de Pedidos</h1>
        <p>Acompanhe e despache os pedidos em tempo real</p>
      </header>

      <S.GridPedidos>
        {pedidos.map((pedido) => (
          <S.OrderCard key={pedido.id} status={pedido.status}>
            <div className="card-header">
              <span className="id"># {pedido.id}</span>
              <span className={`badge ${pedido.status}`}>
                {pedido.status === "enviado" ? "🚚 Enviado" : "⏳ Pendente"}
              </span>
            </div>

            <div className="info-section">
              <h3>{pedido.cliente}</h3>
              <p><strong>📍 Endereço:</strong> {pedido.endereco}</p>
              <p><strong>📱 WhatsApp:</strong> {pedido.whatsapp}</p>
            </div>

            <div className="details-section">
              <h4>Detalhamento:</h4>
              <ul>
                {pedido.resumo.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="total-order">{pedido.total}</div>
            </div>

            <div className="time-section">
              <p><Clock size={14} /> <strong>Pedido em:</strong> {pedido.data}</p>
              {pedido.horarioSaida && (
                <p><Truck size={14} /> <strong>Saiu às:</strong> {pedido.horarioSaida}</p>
              )}
            </div>

            <button 
              className="action-btn"
              onClick={() => toggleStatus(pedido.id, pedido.status)}
            >
              {pedido.status === "pendente" ? "Marcar como Enviado" : "Voltar para Pendente"}
            </button>
          </S.OrderCard>
        ))}
      </S.GridPedidos>
    </S.Container>
  );
}