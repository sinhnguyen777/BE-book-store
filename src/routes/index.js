const productsRouter = require('./products')

function route(app) {
    
    app.use('/products', productsRouter);

    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/search', (req, res) => {
        // console.log(req.query.q);
        res.render('search');
    });
    
}

module.exports = route;