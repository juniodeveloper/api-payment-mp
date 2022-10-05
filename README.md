# API DE PAGAMENTOS

## Edite o arquivo .env

Adicione duas variáveis ​​ao arquivo .env

> SERVER_PORT=3001

> MP_TOKEN=SEU_TOKEN_MERCADO_PAGO

## Exemplo de criação de pagamento com axios

```javascript

const axios = require('axios')

async function createPayment() {

   const data = {
      transaction_amount: 0.12,
      description: 'Descrição da venda',
      payment_method_id: 'pix',
      payer: {
        email: 'example@gmail.com',
        first_name: 'Exemplo',
        last_name: 'Lima'
      }
    }

    const response = await axios.post('https://url_api/api/payment/create', data)

    console.log(response.data.payment.id)

}

createPayment()

```

## Exemplo para obter status de pagamento com axios

```javascript

const axios = require('axios')

async function statusPayment() {

   const data = {
      payment_id: 123456789
    }

    const response = await axios.post('https://url_api/api/payment/status',data)

    console.log(response.data.status)

}

statusPayment()

```

### Precisa de ajuda?

[Meu Telegram](https://t.me/juniodev)
