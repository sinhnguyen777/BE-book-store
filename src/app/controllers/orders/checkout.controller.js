const paypal = require('paypal-rest-sdk');

exports.CheckoutPaypal = (req, res, next) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'Ab9Y8Mu98HMPxM5cRc2jiG7yg9-p1j6eG9ILM6mwhaXuiirejwzUw5W1kPJoQGMN9aqEKBMdki3Q_U8G',
        'client_secret': 'EDmJolIfBdufyq2cOBzGZ5ojph8YrPFx883lmCWM_ntYsvfqouWRJj6X9B5g6fAZHoIjxgYadCKQL1xX'
    })

    const arrayList = []

    const itemCarts = {
        name: req.body.nameCart,
        sku: req.body.sku,
        price: req.body.priceItemCart,
        currency: req.body.currency,
        quantity: req.body.quantity
    }

    if (arrayList.length >= 0) {
        arrayList.push(itemCarts)
    }
    const total = itemCarts.price * itemCarts.quantity
    console.log(total);

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://beonlinelibrary.herokuapp.com/success",
            "cancel_url": "https://beonlinelibrary.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": arrayList
            },
            "amount": {
                "currency": "USD",
                "total": total
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}
