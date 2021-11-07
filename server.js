const express   = require('express');
const dotenv    = require('dotenv');
const morgan    = require('morgan');
const cors      = require('cors');
const mongoose  = require('mongoose');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cors())
app.use(morgan('dev'));

//Importing routes
const usuarioRoute  = require('./routes/usuario');
const educadorRoute = require('./routes/educador');
//const criancaRoute = require('./routes/crianca');

mongoose.connect(
  process.env.DB_CONNECT, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
});

//Make routes available
app.use('/',          usuarioRoute);
app.use('/educador',  educadorRoute);
//app.use('/crianca',  criancaRoute);

const port = process.env.PORT;

app.listen(port, function (err) {
  console.log("server.js >>>")
  console.log('api usuario listening on port '+port);
  if (err) {
    console.log("err >>>")
    console.log(err)
  }
});
