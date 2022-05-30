const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const { json } = require("express/lib/response");

const app = express();
app.use(express.json());
let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

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
  createWriteFile();
  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };
  createWriteFile();
  return res.json({ message: "Produto Alterado com sucesso" });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);
  createWriteFile();
  return res.json({ message: "Produto removido com sucesso" });
});

function createWriteFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002..."));
