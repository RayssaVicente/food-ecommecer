"use client"
import { useCart } from './../contexts/CartContext' 
import * as S from './style'
import Link from 'next/link'
import { useState } from 'react'
import * as yup from 'yup'

// --- FUNÇÕES DE MÁSCARA ---
const masks = {
  cpf: (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').slice(0, 14),
  whatsapp: (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15),
  cep: (v: string) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9),
  cartao: (v: string) => v.replace(/\D/g, '').replace(/(\d{4})(\d)/g, '$1 $2').trim().slice(0, 19),
  validade: (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5),
  cvv: (v: string) => v.replace(/\D/g, '').slice(0, 3),
}

// --- SCHEMA DE VALIDAÇÃO YUP ---
const checkoutSchema = yup.object().shape({
  nome: yup.string().required('Nome completo é obrigatório').min(5, 'Digite seu nome completo'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  whatsapp: yup.string().required('WhatsApp é obrigatório').min(14, 'Telefone inválido'),
  cpf: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
  cep: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido'),
  endereco: yup.string().required('Endereço é obrigatório'),
  numero: yup.string().required('Nº é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Selecione o estado'),
  cartaoNumero: yup.string().required('Número do cartão é obrigatório').min(19, 'Cartão incompleto'),
  cartaoValidade: yup.string().required('Obrigatório').min(5, 'Data inválida'),
  cartaoCVV: yup.string().required('Obrigatório').min(3, 'CVV inválido'),
})

export default function CheckoutPage() {
  const { cart } = useCart()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    nome: '', email: '', whatsapp: '', cpf: '', cep: '',
    endereco: '', numero: '', complemento: '', bairro: '',
    cidade: '', estado: '', cartaoNumero: '', cartaoValidade: '', cartaoCVV: '',
  })

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let maskedValue = value

    // Aplica a máscara baseada no nome do campo
    if (name === 'cpf') maskedValue = masks.cpf(value)
    if (name === 'whatsapp') maskedValue = masks.whatsapp(value)
    if (name === 'cep') maskedValue = masks.cep(value)
    if (name === 'cartaoNumero') maskedValue = masks.cartao(value)
    if (name === 'cartaoValidade') maskedValue = masks.validade(value)
    if (name === 'cartaoCVV') maskedValue = masks.cvv(value)

    setFormData(prev => ({ ...prev, [name]: maskedValue }))
    
    // Limpa o erro do campo enquanto o usuário digita
    if (errors[name]) setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
    });
  }

  const handleFinalizarPedido = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (cart.length === 0) return alert("Seu carrinho está vazio!")
      
      // Valida o formulário
      await checkoutSchema.validate(formData, { abortEarly: false })
      
      console.log('Dados prontos para o banco:', { ...formData, total, itens: cart })
      alert('Pedido enviado com sucesso!')
    } catch (err: any) {
      const validationErrors: Record<string, string> = {}
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <S.CheckoutContainer>
      <header>
        <Link href="/" className="back-link">← Voltar para o cardápio</Link>
        <h1>Finalizar Pedido</h1>
      </header>

      <div className="content">
        <S.FormSection onSubmit={handleFinalizarPedido}>
          <h2>Suas Informações</h2>
          
          <div className="input-group">
            <label>Nome Completo</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
            {errors.nome && <S.ErrorMessage>{errors.nome}</S.ErrorMessage>}
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group">
              <label>WhatsApp</label>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="(99) 99999-9999" />
              {errors.whatsapp && <S.ErrorMessage>{errors.whatsapp}</S.ErrorMessage>}
            </div>
            <div className="input-group">
              <label>CPF</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" />
              {errors.cpf && <S.ErrorMessage>{errors.cpf}</S.ErrorMessage>}
            </div>
          </div>

          <h2>Endereço de Entrega</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>CEP</label>
              <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} placeholder="00000-000" />
              {errors.cep && <S.ErrorMessage>{errors.cep}</S.ErrorMessage>}
            </div>
            <div className="input-group" style={{ flex: 2 }}>
              <label>Rua/Logradouro</label>
              <input type="text" name="endereco" value={formData.endereco} onChange={handleInputChange} />
              {errors.endereco && <S.ErrorMessage>{errors.endereco}</S.ErrorMessage>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group">
              <label>Número</label>
              <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} />
              {errors.numero && <S.ErrorMessage>{errors.numero}</S.ErrorMessage>}
            </div>
            <div className="input-group">
              <label>Bairro</label>
              <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} />
              {errors.bairro && <S.ErrorMessage>{errors.bairro}</S.ErrorMessage>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group" style={{ flex: 2 }}>
              <label>Cidade</label>
              <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} />
              {errors.cidade && <S.ErrorMessage>{errors.cidade}</S.ErrorMessage>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Estado</label>
              <select name="estado" value={formData.estado} onChange={handleInputChange}>
                <option value="">UF</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="PB">PB</option>
              </select>
              {errors.estado && <S.ErrorMessage>{errors.estado}</S.ErrorMessage>}
            </div>
          </div>

          <h2>Pagamento</h2>
          <div className="input-group">
            <label>Número do Cartão</label>
            <input type="text" name="cartaoNumero" value={formData.cartaoNumero} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
            {errors.cartaoNumero && <S.ErrorMessage>{errors.cartaoNumero}</S.ErrorMessage>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group">
              <label>Validade</label>
              <input type="text" name="cartaoValidade" value={formData.cartaoValidade} onChange={handleInputChange} placeholder="MM/AA" />
              {errors.cartaoValidade && <S.ErrorMessage>{errors.cartaoValidade}</S.ErrorMessage>}
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="text" name="cartaoCVV" value={formData.cartaoCVV} onChange={handleInputChange} placeholder="123" />
              {errors.cartaoCVV && <S.ErrorMessage>{errors.cartaoCVV}</S.ErrorMessage>}
            </div>
          </div>

          <button type="submit" className="submit-btn">Confirmar e Enviar Pedido</button>
        </S.FormSection>

        <S.SummarySection>
          {/* ... resumo do carrinho ... */}
        </S.SummarySection>
      </div>
    </S.CheckoutContainer>
  )
}