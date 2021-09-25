const productsRouter = require('./products.route');
const catalogsRouter = require('./catalogs.route');

function route(app) {
    
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/search', (req, res) => {
        // console.log(req.query.q);
        res.render('search');
    });
    
}

module.exports = route;