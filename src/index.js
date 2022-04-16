const express = require('express')
const routes = require('./routes');
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`);
})
