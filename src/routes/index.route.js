const adminsRouter = require('./admins.route');
const PaymentRouter = require('./payment/payment.route')
const productsRouter = require('./products.route');
const orderDetailsRouter = require('./orderDetails.route');
const rolesRouter = require('./roles.route');
const permissionsRouter = require('./permissions.route');
const ordersRouter = require('./orders.route');
const orderCancelsRouter = require('./orderCancels.route');
const catalogsRouter = require('./catalogs.route');
const feedbacksRouter = require('./feedback.route');
const discountCodeRouter = require('./discountCode.route');
const usersRouter = require('./users.route');
const wishlishRouter = require('./wishlish.router')
const chaptersRouter = require('./chapter.route');
const vipsRouter = require('./vip.route');
const commentsRouter = require('./comment.router');
const statisticalRouter = require('./statistical/statistical.roter')


function route(app) {
    // app.use('/', function(req,res,next){
    //     console.log(req.session);
    //     // res.send(req.session.view)
    // });
    app.use('/comment', commentsRouter);
    app.use('/vip', vipsRouter);
    app.use('/chapter', chaptersRouter);
    app.use('/admins', adminsRouter);
    app.use('/orderDetails', orderDetailsRouter);
    app.use('/roles', rolesRouter);
    app.use('/permissions', permissionsRouter);
    app.use('/orders', ordersRouter);
    app.use('/orderCancels', orderCancelsRouter);
    app.use('/feedbacks', feedbacksRouter);
    app.use('/users', usersRouter);
    app.use('/wishlish', wishlishRouter);
    app.use('/discountCodes', discountCodeRouter);
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);
    app.use('/pay', PaymentRouter);
    app.use('/statistical', statisticalRouter);

}

module.exports = route;


