const express = require("express");
const { randomUUID } = require("crypto");
const app = express();
app.use(express.json());
const products = [];

/* 
POST => Inserir um dado
GET => BUscar um/mais dados
PUT => Alterar um dado
DELETE => Remover um dado */

/* 
BODY => Sempre que quiser enviar dados para miha aplicação
Params => /prodects/1321564654654
Query => /products?231313213213
*/

app.post("/products", (req, res) => {
  //nome e preco

  const { name, price } = req.body;

  const product = { name, price, id: randomUUID() };

  products.push(product);

  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002..."));
