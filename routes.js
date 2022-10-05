import express from 'express'
import ApiPayment from './src/controllers/api-payment.js'
const route = express.Router()

route.post('/api/payment/create', ApiPayment.createPayment)
route.post('/api/payment/status', ApiPayment.statusPayment)
route.post('/api/hook/payment/status', ApiPayment.statusPaymentMP)

export default route
