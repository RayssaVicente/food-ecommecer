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

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório').min(5, 'Digite seu nome completo'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  mobile: yup.string().required('WhatsApp é obrigatório').min(14, 'Telefone inválido'),
  document: yup.string().required('CPF é obrigatório').min(14, 'CPF inválido'),
  zipCode: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido'),
  street: yup.string().required('Endereço é obrigatório'),
  number: yup.string().required('Nº é obrigatório'),
  complement: yup.string().nullable(),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Obrigatório').length(2, 'UF deve ter 2 caracteres'),
  cartaoNumero: yup.string().required('Obrigatório').min(19, 'Incompleto'),
  cartaoValidade: yup.string().required('Obrigatório').min(5, 'Inválido'),
  cartaoCVV: yup.string().required('Obrigatório').min(3, 'Inválido'),
})

export default function CheckoutPage() {
  const { cart, payOrder } = useCart()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showModal, setShowModal] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', document: '', zipCode: '',
    street: '', number: '', complement: '', neighborhood: '',
    city: '', state: '', cartaoNumero: '', cartaoValidade: '', cartaoCVV: '',
  })

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let maskedValue = value

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

  const handleConfirmOrder = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (cart.length === 0) return alert("Seu carrinho está vazio!")

  try {
    // 1. Validação dos campos
    await checkoutSchema.validate(formData, { abortEarly: false })

    // 2. Mapeamento para o formato que seu backend (CheckoutService) espera
    const customerData = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      document: formData.document.replace(/\D/g, ''), // Remove máscara
      zipCode: formData.zipCode.replace(/\D/g, ''),
      street: formData.street,
      number: formData.number,
      complement: formData.complement || '',
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
    }

    const paymentData = {
      creditCardNumber: formData.cartaoNumero.replace(/\s/g, ''),
      creditCardHolder: formData.fullName,
      creditCardExpiration: formData.cartaoValidade,
      creditCardSecurityCode: formData.cartaoCVV,
    }

    // 3. Chama a função do contexto
    await payOrder(customerData, paymentData)
    
    
    setShowModal(true)

  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const validationErrors: Record<string, string> = {}
      err.inner?.forEach((error: any) => {
        validationErrors[error.path] = error.message
      })
      setErrors(validationErrors)
    } else {
      alert("Erro ao processar pagamento. Verifique os dados.")
    }
  }
}

  const fecharModalERecarregar = () => {
    setShowModal(false)
    window.location.href = '/' // Volta para o cardápio e limpa tudo
  }

  return (
    <S.CheckoutContainer>
      {/* MODAL DE RESPOSTA */}
      {showModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <div className="icon">✅</div>
            <h2>Pedido enviado com sucesso!</h2>
            <p>Obrigado, <strong>{formData.fullName}</strong>!</p>
            <p>Seu pedido será enviado para: <br/> {formData.street}, {formData.number}</p>
            <button onClick={fecharModalERecarregar}>OK</button>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      <header>
        <Link href="/" className="back-link">← Voltar para o cardápio</Link>
        <h1>Finalizar Pedido</h1>
      </header>

      <div className="content">
        <S.FormSection>
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

          <div className="row">
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
          <div className="row">
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

          <div className="row">
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

          <div className="row">
            <div className="input-group" style={{ flex: 2 }}>
              <label>Cidade</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              {errors.city && <S.ErrorMessage>{errors.city}</S.ErrorMessage>}
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Estado</label>
              <select name="state" value={formData.state} onChange={handleInputChange}>
                <option value="">UF</option>
                <option value="PB">PB</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
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

          <div className="row">
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

          <button onClick={handleConfirmOrder}>Confirmar e enviar pedido</button>
        </S.FormSection>

        <S.SummarySection>
          <h2>Resumo</h2>
          <div className="items-list">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <strong>R$ {(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="total-container">
            <span>Total</span>
            <strong className="total-value">R$ {total.toFixed(2)}</strong>
          </div>
        </S.SummarySection>
      </div>
    </S.CheckoutContainer>
  )
}