const paypal = require('paypal-rest-sdk');

let dataValues = ""
exports.GetItemCart = async (values) => {
    dataValues = values
}

exports.PaypalSuccess = (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    console.log(payerId, paymentId);

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "50.00"
            }
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        // if (error) {
        //     throw error
        // } else {
        //     console.log(JSON.stringify(payment));
        //     res.send('Success');
            
        //     }
            return res
                .status(200)
                .json({ code: "200", message: "sucsses", data: dataValues });
    });
}
