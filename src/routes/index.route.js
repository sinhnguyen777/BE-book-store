const adminsRouter = require('./admins.route');

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
const chaptersRouter = require('./chapter.route');


function route(app) {
    // app.use('/', function(req,res,next){
    //     console.log(req.session);
    //     // res.send(req.session.view)
    // });
    app.use('/chapter', chaptersRouter);
    app.use('/admins', adminsRouter);
    app.use('/orderDetails', orderDetailsRouter);
    app.use('/roles', rolesRouter);
    app.use('/permissions', permissionsRouter);
    app.use('/orders', ordersRouter);
    app.use('/orderCancels', orderCancelsRouter);
    app.use('/feedbacks', feedbacksRouter);
    app.use('/users', usersRouter);
    app.use('/discountCodes', discountCodeRouter);
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);
}

module.exports = route;


