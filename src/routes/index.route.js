const productsRouter = require('./products.route');
const catalogsRouter = require('./catalogs.route');
const feedbacksRouter = require('./feedback.route');
const discountCodeRouter = require('./discountCode.route');
const usersRouter = require('./user.route');

function route(app) {
    
    app.use('/feedbacks', feedbacksRouter);
    app.use('/users', usersRouter);
    app.use('/discountCodes', discountCodeRouter);
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);



    
}

module.exports = route;