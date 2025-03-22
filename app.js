const express = require('express');
const bodyParser = require('body-parser');
const clientsRoutes = require('./routes/clients');
const dadataRoutes = require('./routes/dadata');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));


app.use(function(request, response, next){
  // console.log(request);  
  next();
});

app.use('/api/client', clientsRoutes);
app.use('/api/dadata', dadataRoutes);

app.listen(process.env.PORT, () => {  
  console.log(`
    ******************************************
    *  ${process.env.SERVICE_NAME} running on port ${process.env.PORT}   *
    ******************************************`);

});
