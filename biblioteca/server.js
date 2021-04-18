const express = require ('express');
const db = require ("./app/models"); //importar a conexão do banco de dados, não precisa importar o index pois o node chama nativamente

const app = express();

app.use(express.json()); // pois o express vai utilizar o jason para se comunicar
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json({message: "Testar servidor"}); //função para ver se o servidor está funcionando
});

//importar a conexão do banco de dados
db.sequelize.sync();

require("./app/routes/livro.route")(app);
require("./app/routes/locatario.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`); //processo é nativo do node se nao achar a PORTA nativa vai usar a 8080
});