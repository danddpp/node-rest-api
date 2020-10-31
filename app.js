const express = require('express');
const app = express();
const morgan = require('morgan');//modulo para exibir no console as requisições
//que chegam ao servidor (deve ser configurado para uso na fase de desenvolvimento
//morgan('dev'))
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./api/routes/product'); 
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');;


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/node-rest-api-db');

//indica qual a classe de promise que o mongoose irá utilizar 
mongoose.Promise = global.Promise;



//configurando o módulo morgan para exibir no console os logs das requisições
//que chegam ao servidor
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));//expoẽa o storage para o navegador
//sendo possível acessar a imagem pela rota:
// http://<ip servidor>/<diretório do storage/nome do arquivo>
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin","*");
   res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );    
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE');
      return res.status(200).json({});
   }
   app.use(cors());
   next();
});


//rotas que devem manipular requisições
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;