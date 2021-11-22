const paypal = require('paypal-rest-sdk')

export default function ConfigPaypal() {
    return (
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'Ab9Y8Mu98HMPxM5cRc2jiG7yg9-p1j6eG9ILM6mwhaXuiirejwzUw5W1kPJoQGMN9aqEKBMdki3Q_U8G',
            'client_secret': 'EDmJolIfBdufyq2cOBzGZ5ojph8YrPFx883lmCWM_ntYsvfqouWRJj6X9B5g6fAZHoIjxgYadCKQL1xX'
        })

    )
}
