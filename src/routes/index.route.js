const productsRouter = require('./products.route');
const catalogsRouter = require('./catalogs.route');
const siteRouter = require('./site.route');

function route(app) {
    
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);
    app.use('/', siteRouter);



    
}

module.exports = route;