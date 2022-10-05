import mercadopago from 'mercadopago'

class ApiPayment {

  async statusPayment (req, res) {

    const { payment_id } = req.body

    if (!payment_id) {
      return res.status(400).json(
        {
          success: false,
          message: 'payment_id é obrigatório.'
        }
      )
    }

    if (typeof payment_id !== 'number') {
      return res.status(400).json(
        {
          success: false,
          message: 'payment_id tem que ser número'
        }
      )
    }

    try {

      mercadopago.configurations.setAccessToken(process.env.MP_TOKEN)

      const response = await mercadopago.payment.get(payment_id)

      return res.status(200).json(
        {
          success: true,
          data: response.body
        }
      )

    } catch (_) {
      return res.status(400).json(
        {
          success: false,
          message: 'Não foi possível obter o status do pagamento.'
        }
      )
    }

  }

  async createPayment (req, res) {

    const { transaction_amount, description, payer } = req.body

    const { email, first_name, last_name } = payer

    function bodyInvalid () {
      if (!transaction_amount) {
        return 'transaction_amount é obrigatório.'
      } else if (!description) {
        return 'description é obrigatório.'
      } else if (!payer) {
        return 'payer é obrigatório.'
      } else if (!email) {
        return 'email é obrigatório.'
      } else if (!first_name) {
        return 'first_name é obrigatório.'
      } else if (!last_name) {
        return 'last_name é obrigatório.'
      } else {
        return undefined
      }
    }

    if (bodyInvalid()) {
      return res.status(400).json(
        {
          success: false,
          message: bodyInvalid()
        }
      )
    }

    try {

      mercadopago.configurations.setAccessToken(process.env.MP_TOKEN)

      const paymentData = {
        transaction_amount,
        description,
        payment_method_id: 'pix',
        payer: {
          email: payer.email,
          first_name: payer.first_name,
          last_name: payer.last_name
        },
        notification_url: getFullHostName(req.hostname)
      }

      const response = await mercadopago.payment.create(paymentData)

      const payment = response.body

      return res.status(200).json(
        {
          success: true,
          payment
        }
      )

    } catch (error) {
      return res.status(400).json(
        {
          success: false,
          message: 'Não foi possivel prosseguir com a solicitação.'
        }
      )
    }

  }

  async statusPaymentMP (req, res) {

    const { action, data } = req.body

    try {

      if (action === 'payment.updated') {

        /**
                     * Atualização de pagamento
                     */

        mercadopago.configurations.setAccessToken(process.env.MP_TOKEN)

        const response = await mercadopago.payment.get(data.id)

        console.log(response.body.status)

        /**
                        * Atualize o status do pagamento em seu banco de dados aqui.
                        * O status do pagamento pode ser obtido com response.body.status
                        * Obtenha mais detalhes de resposta de pagamento em https://www.mercadopago.com.br/developers/pt/docs/subscriptions/additional-content/notifications/webhooks
                        */

        return res.send()

      }

    } catch (error) {
      console.log(error)
    }

    return res.status(400).send()

  }

}

function getFullHostName (hostname) {
  return `https://${hostname}/api/hook/payment/status`
}

export default new ApiPayment()
