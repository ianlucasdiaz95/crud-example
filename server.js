const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
        }

        // Conexión a la base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async dbConnection(){
        try {

            await mongoose.connect(process.env.DB_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log('DB is connected');

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.paths.users, require('./routes/users.routes'));
        this.app.use(this.paths.auth, require('./routes/auth.routes'));
        this.app.use(this.paths.categories, require('./routes/categories.routes'));
        this.app.use(this.paths.products, require('./routes/products.routes'));
        this.app.use(this.paths.search, require('./routes/search.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
