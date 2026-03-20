import toast from 'react-hot-toast';

interface ProductConfig {
  emoji: string;
  message: string;
}

const getProductConfig = (category: string): ProductConfig => {
  // Garantimos que a comparação ignore maiúsculas/minúsculas
  const lowerCategory = category.toLowerCase();

  // Comparações baseadas EXATAMENTE nas categorias do seu JSON
  if (lowerCategory === 'hamburgers')
    return { emoji: '🍔', message: 'Hambúrguer suculento no carrinho!' };

  if (lowerCategory === 'pizzas')
    return { emoji: '🍕', message: 'Fatia de felicidade adicionada!' };

  if (lowerCategory === 'drinks')
    return { emoji: '🥤', message: 'Bebida gelada garantida!' };

  if (lowerCategory === 'sorvetes')
    return { emoji: '🍦', message: 'Sobremesa geladinha adicionada!' };

  // Caso você adicione uma categoria nova no futuro e esqueça de atualizar aqui
  return { emoji: '✅', message: 'Item adicionado com sucesso!' };
};

export const showAddProductToast = (productName: string, productCategory: string) => {
  const { emoji, message } = getProductConfig(productCategory);

  toast.custom((t) => (
    <div
      style={{
        opacity: t.visible ? 1 : 0,
        transform: t.visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s ease-in-out',
        background: '#1a1a1a',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid #e03131',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
        zIndex: 9999,
      }}
    >
      <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: '0.95rem' }}>{productName}</strong>
        <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{message}</span>
      </div>
    </div>
  ), {
    duration: 2500,
    position: 'bottom-center',
  });
};