//criar rota para poder gravar na aplicação
module.exports = app => {
    const livros = require ("../controllers/livro.controller");

    var router = require ("express").Router();

    //Criação de livro
    router.post("/", livros.create);

    //Retorna todos os livros cadastrados
    router.get("/", livros.findAll);

    //Retorna a busca dos livros pelo autor especifico:
    router.get("/:autor", livros.findOne);

    //Atualização do livro por id:
    router.put("/:id", livros.update);

     //Deletar livro por ID:
     router.delete("/:id", livros.delete);

     //Deletar todos os livros:
     router.delete("/", livros.deleteAll);

    
    app.use('/api/livros', router)
}