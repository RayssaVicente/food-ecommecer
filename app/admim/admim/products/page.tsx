"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import * as S from "./style"; 

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({ 
    name: "", 
    price: "", 
    category: "hamburgers",
    imageUrl: "" 
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  // Agrupando produtos por categoria
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openDeleteModal = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await fetch(`http://localhost:3001/products/${selectedProduct.id}`, { method: "DELETE" });
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      } catch (error) {
        alert("Erro ao deletar");
      }
    }
  };

  const openFormModal = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({ 
        name: product.name, 
        price: String(product.price), 
        category: product.category,
        imageUrl: product.image || "" 
      });
    } else {
      setSelectedProduct(null);
      setFormData({ name: "", price: "", category: "hamburgers", imageUrl: "" });
    }
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedProduct ? "PUT" : "POST";
    const url = selectedProduct 
      ? `http://localhost:3001/products/${selectedProduct.id}` 
      : "http://localhost:3001/products";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          price: Number(formData.price),
          image: formData.imageUrl || undefined 
        }),
      });
      fetchProducts();
      setIsFormModalOpen(false);
    } catch (error) {
      alert("Erro ao salvar produto");
    }
  };

  return (
    <S.Container>
      <header>
        <div className="logo">
           <h1>Gerenciar <span>Produtos</span></h1>
        </div>
        <S.AddButton onClick={() => openFormModal()}>
          <Plus size={20} /> NOVO PRODUTO
        </S.AddButton>
      </header>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <section key={category} style={{ width: '100%', marginBottom: '3rem' }}>
          <h2 style={{ 
            color: '#ffcc00', 
            textTransform: 'uppercase', 
            marginBottom: '1.5rem',
            borderBottom: '1px solid #333',
            paddingBottom: '0.5rem'
          }}>
            {category}
          </h2>
          
          <S.ProductGrid>
            {items.map((product) => (
              <S.Card key={product.id}>
                <S.ImageContainer>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="no-image">N/A</div>
                  )}
                </S.ImageContainer>

                <h3>{product.name}</h3>
                
                <div className="footer">
                  <strong>R$ {Number(product.price).toFixed(2)}</strong>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => openFormModal(product)}
                      style={{ background: '#333', borderRadius: '8px', width: '35px', height: '35px' }}
                    >
                      <Pencil size={16} color="#fff" />
                    </button>
                    <button 
                      className="delete" 
                      onClick={() => openDeleteModal(product.id)}
                      style={{ background: '#e03131', borderRadius: '8px', width: '35px', height: '35px' }}
                    >
                      <Trash2 size={16} color="#fff" />
                    </button>
                  </div>
                </div>
              </S.Card>
            ))}
          </S.ProductGrid>
        </section>
      ))}

      {/* MODAL DE EXCLUSÃO */}
      {isDeleteModalOpen && (
        <S.Overlay>
          <S.ModalContent>
            <h2>Confirmar Exclusão</h2>
            <p>Deseja mesmo remover <strong>{selectedProduct?.name}</strong>?</p>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
              <button className="confirm" onClick={confirmDelete}>Sim, Excluir</button>
            </div>
          </S.ModalContent>
        </S.Overlay>
      )}

      {/* MODAL DE FORMULÁRIO */}
      {isFormModalOpen && (
        <S.Overlay>
          <S.ModalContent>
            <h2>{selectedProduct ? "Editar Produto" : "Novo Produto"}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className="image-preview">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Pré-visualização" />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Upload size={30} color="#444" />
                    <span>Nenhuma imagem</span>
                  </div>
                )}
              </div>

              <label>Selecione uma imagem</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              <label>Nome do Produto</label>
              <input 
                type="text" required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              
              <label>Preço</label>
              <input 
                type="number" step="0.01" required
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              
              <label>Categoria</label>
              <select 
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="hamburgers">Hamburgers</option>
                <option value="pizzas">Pizzas</option>
                <option value="drinks">Bebidas</option>
                <option value="sorvetes">Sobremesas</option>
              </select>

              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setIsFormModalOpen(false)}>Cancelar</button>
                <button type="submit" className="confirm" style={{ background: '#27ae60' }}>Salvar</button>
              </div>
            </form>
          </S.ModalContent>
        </S.Overlay>
      )}
    </S.Container>
  );
}