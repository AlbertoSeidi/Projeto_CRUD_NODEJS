const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Minha primeira aplicacao com NodeJS" }));
  })
  .listen(4001, () => console.log("Servidor esta rodando na porta 4001"));
