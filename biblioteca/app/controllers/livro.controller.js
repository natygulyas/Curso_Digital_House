const db = require ("../models");

Livro = db.livros;
const Op = db.Sequelize.Op;

//CRIAR MÉTODOS

//Validate Request, validar o banco
exports.create = (req, res) => {
    
    if (!req.body.nome) {
        res.status(400).send({
            message: "O nome do livro não pode ser vazio!"
        })
        return;
    }

    //Para criar o objeto livro com os campos necessários
    const livro = {
        nome: req.body.nome,
        autor: req.body.autor,
        sinopse: req.body.sinopse,
        dataLancamento: req.body.dataLancamento,
        dataAluguel: req.body.dataAluguel,
        estado: req.body.estado,
    }
    Livro.create(livro)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro interno ao cadastrar o livro",
        });
    });
};

//Para exibir todos os livros cadastrados
exports.findAll = (req, res) => {
    Livro.findAll()
    .then((data) => { 
    res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os livros"
        });
    });
};

//Método para atualizar e mudar manualmente para Disponível ou Indisponível
exports.update = (req, res) => {
    const id = req.params.id

    //quando isso for atendido:
    Livro.update(req.body, {
        where: {id : id}
    })
    //vai fazer isso:
    .then(num => {
        if (num == 1) {
            res. send({
                message: "Livro atualizado"
            });
        } else {
            res.send({
                message: `Não foi possivel atualizar o livro com o ${id} pois ele não foi localizado ou seu body está vazio`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao atualizar o livro com ${id}`
        })
    })
}

//Pesquisar por nome do autor
exports.findOne = (req, res) => {
    const autor = req.params.autor

    //quando isso for atendido:
    Livro.findAll({where: {autor : autor}})
    //vai fazer isso:
    .then((data) => {
        res.send(data); 
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao localizar o autor: ${autor}`
        })
    })
}

//Deletar livro por ID
exports.delete = (req, res) => {
    const id = req.params.id

    
    Livro.destroy({where: {id : id}})
    
    .then(num => {
        if (num == 1) {
            res. send({
                message: "Livro deletado com sucesso"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o livro com o ID ${id} pois ele não foi localizado ou seu body está vazio`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao deletar o livro com ID: ${id}`
        })
    })
}

//Deletar todos os livros
exports.deleteAll = (req, res) => {
    Livro.destroy({where: {},
    truncate: false})
    .then(nums => {
      res.send({ message: `${nums} Todos os livros foram deletados com sucesso`});
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Erro ao deletar todos os livros"
      });
    });
  };



/*
//Metodo criado pela Catia que busca por autor, bem completinho (para estudo depois - Alias)
exports.findAll = (req, res) => {  
    
    const autor = req.query.autor;
    
    let condition = autor ? { autor: {[Op.like]: `%${autor}%`}} : null;
    
    Livro.findAll({ where: condition })    
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erro interno ao buscar os livros."
        });
    })
};

*/