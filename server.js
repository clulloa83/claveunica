const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            claveunica: '/api/claveunica',
        };
        this.middleware();
        this.routes();
    }

    middleware(){

        // CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        // this.app.use( express.static('public'));

        //lista blanca CORS
        let whitelist  = process.env.ORIGENES_PERMITIDOS.split(' ');
        this.app.use(cors({
            origin: function(origin, callback){
            // allow requests with no origin // (like mobile apps or curl requests)
                if( !origin) return callback(null, true);
                if(whitelist.indexOf(origin) === -1)
                {
                    let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        }));
    }

    routes(){
        this.app.use(this.paths.claveunica, require('./routes/clave-unica'));
    }

    listen(){
        this.app.listen( this.port,  () => {
            console.log(`servidor corriendo en puerto ${ this.port }`);
        });
    }

}

module.exports = Server;