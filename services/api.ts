import { Product } from '@/app/interfaces/Product';
import axios from 'axios';
import { CustomerData } from '@/app/interfaces/CustomerData';
import {PaymentData} from '@/app/interfaces/PaymentData'    

export const api = axios.create({
  baseURL: "https://backend-food-ecommecer.onrender.com/"
});

export const processCheckout = (cart: Product[], customer: CustomerData, payment: PaymentData) => api.post('/checkout', {
  cart,
  customer:{
    fullName: customer.fullName,
    email: customer.email,
    mobile: customer.mobile,
    document: customer.document,
    zipCode: customer.zipCode,
    street: customer.street,
    number: customer.number,
    complement: customer.complement,
    neighborhood: customer.neighborhood,
    city: customer.city,
    state: customer.state,
  },
  payment: {
    creditCardNumber: payment.creditCardNumber,
    creditCardHolder: payment.creditCardHolder,
    creditCardExpiration: payment.creditCardExpiration, 
    creditCardSecurityCode: payment.creditCardSecurityCode,
      
    
    
  },

  
})