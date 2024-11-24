const express = require('express');
const bodyParser = require('body-parser');
const clientsRoutes = require('./routes/clients');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

app.use(function(request, response, next){
  console.log(request.url);  
  next();
});

app.use('/api/client', clientsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.SERVICE_NAME} running on port ${process.env.PORT}`);
});
