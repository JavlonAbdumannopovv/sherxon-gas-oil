const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');

const app = express();

// CORS ni sozlash
app.use(cors());

// JSON Server middleware larini ishlatish
const middlewares = jsonServer.defaults();
server.use(middlewares);

// JSON Server routerini Express ilovasiga ulash
app.use('/api', router);

// Express ilovasini JSON Server bilan birlashtirish
server.use(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
