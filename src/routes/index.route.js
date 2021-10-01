const adminsRouter = require('./admins.route');

const productsRouter = require('./products.route');
const orderDetailsRouter = require('./orderDetails.route');
const rolesRouter = require('./roles.route');
const prmissionsRouter = require('./prmissions.route');
const ordersRouter = require('./orders.route');
const orderCancelsRouter = require('./orderCancels.route');
const catalogsRouter = require('./catalogs.route');
const feedbacksRouter = require('./feedback.route');
const discountCodeRouter = require('./discountCode.route');
const usersRouter = require('./users.route');
const usersRouter = require('./user.route');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions={
    swaggerDefinition:{
        infor:{
            title:'Customer API',
            description:"Cumtomer API information",
            contact:{
                name:"Amazing Deverloper"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:["index.route.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);



function route(app) {
    
    app.use('/admins', adminsRouter);
    app.use('/orderDetails', orderDetailsRouter);
    app.use('/roles', rolesRouter);
    app.use('/prmissions', prmissionsRouter);
    app.use('/orders', ordersRouter);
    app.use('/orderCancels', orderCancelsRouter);
    app.use('/feedbacks', feedbacksRouter);
    app.use('/users', usersRouter);
    app.use('/discountCodes', discountCodeRouter);
    app.use('/products', productsRouter);
    app.use('/catalogs', catalogsRouter);
}

module.exports = route;

/**
 * @swagger
 * /catalogs:
 *   get:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *   
 *         
 */
