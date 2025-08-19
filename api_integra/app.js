const apiRoutes = require('./routes/rotas');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: '123456789', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/integra-api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
