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

// --- SCHEMA DE VALIDAÇÃO YUP (Sincronizado com o Prisma) ---
const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório').min(5, 'Digite seu nome completo'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  mobile: yup.string().required('WhatsApp é obrigatório').min(14, 'Telefone inválido'),
  document: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
  zipCode: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido'),
  street: yup.string().required('Endereço é obrigatório'),
  number: yup.string().required('Nº é obrigatório'),
  complement: yup.string().nullable(), // Opcional no Prisma (String?)
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Obrigatório').length(2, 'UF deve ter 2 caracteres'),
  // Campos de cartão (não costumam ir para o banco Customer, mas mantidos para o form)
  cartaoNumero: yup.string().required('Obrigatório').min(19, 'Incompleto'),
  cartaoValidade: yup.string().required('Obrigatório').min(5, 'Inválido'),
  cartaoCVV: yup.string().required('Obrigatório').min(3, 'Inválido'),
})

export default function CheckoutPage() {
  const { cart } = useCart()
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Estado inicial com as chaves exatas da imagem (fullName, mobile, document, etc)
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    mobile: '', 
    document: '', 
    zipCode: '',
    street: '', 
    number: '', 
    complement: '', 
    neighborhood: '',
    city: '', 
    state: '', 
    cartaoNumero: '', 
    cartaoValidade: '', 
    cartaoCVV: '',
  })

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let maskedValue = value

    // Aplica a máscara baseada no name do input
    if (name === 'document') maskedValue = masks.cpf(value)
    if (name === 'mobile') maskedValue = masks.whatsapp(value)
    if (name === 'zipCode') maskedValue = masks.cep(value)
    if (name === 'cartaoNumero') maskedValue = masks.cartao(value)
    if (name === 'cartaoValidade') maskedValue = masks.validade(value)
    if (name === 'cartaoCVV') maskedValue = masks.cvv(value)

    setFormData(prev => ({ ...prev, [name]: maskedValue }))
    
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
      await checkoutSchema.validate(formData, { abortEarly: false })
      
      // Aqui os dados já estão com as chaves prontas para o seu model 'Customer'
      console.log('Dados para o Prisma:', { ...formData, total })
      alert('Pedido enviado com sucesso!')
    } catch (err: any) {
      const validationErrors: Record<string, string> = {}
      err.inner?.forEach((error: any) => {
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
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            {errors.fullName && <S.ErrorMessage>{errors.fullName}</S.ErrorMessage>}
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group">
              <label>WhatsApp</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="(99) 99999-9999" />
              {errors.mobile && <S.ErrorMessage>{errors.mobile}</S.ErrorMessage>}
            </div>
            <div className="input-group">
              <label>CPF</label>
              <input type="text" name="document" value={formData.document} onChange={handleInputChange} placeholder="000.000.000-00" />
              {errors.document && <S.ErrorMessage>{errors.document}</S.ErrorMessage>}
            </div>
          </div>

          <h2>Endereço de Entrega</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>CEP</label>
              <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="00000-000" />
              {errors.zipCode && <S.ErrorMessage>{errors.zipCode}</S.ErrorMessage>}
            </div>
            <div className="input-group" style={{ flex: 2 }}>
              <label>Rua/Logradouro</label>
              <input type="text" name="street" value={formData.street} onChange={handleInputChange} />
              {errors.street && <S.ErrorMessage>{errors.street}</S.ErrorMessage>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group">
              <label>Número</label>
              <input type="text" name="number" value={formData.number} onChange={handleInputChange} />
              {errors.number && <S.ErrorMessage>{errors.number}</S.ErrorMessage>}
            </div>
            <div className="input-group">
              <label>Bairro</label>
              <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} />
              {errors.neighborhood && <S.ErrorMessage>{errors.neighborhood}</S.ErrorMessage>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="input-group" style={{ flex: 2 }}>
              <label>Cidade</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              {errors.city && <S.ErrorMessage>{errors.city}</S.ErrorMessage>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Estado</label>
              <select name="state" value={formData.state} onChange={handleInputChange}>
                <option value="">UF</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="PB">PB</option>
              </select>
              {errors.state && <S.ErrorMessage>{errors.state}</S.ErrorMessage>}
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