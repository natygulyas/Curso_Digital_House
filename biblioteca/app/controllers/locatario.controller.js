const db = require ("../models");

Locatario = db.locatarios;
const Op = db.Sequelize.Op; //alias para diminuir o codigo que escrevemos dentro das operações (estudar sobre)

exports.create = (req, res) => {
    
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome não pode ser vazio!"
        })
        return;
    }

//CREATE
    const locatario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        situacao: req.body.situacao ? req.body.situacao : false
    }
    Locatario.create(locatario)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Erro interno ao criar o locatário",
        });
    });
};

//READ
exports.findAll = (req, res) => {
    Locatario.findAll()
    .then((data) => { 
    res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os locatarios"
        });
    });
};

//READ
exports.findAllSituacao = (req, res) => {
    Locatario.findAll({where: {situacao: true}})
    .then((data) => { 
        res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Erro interno ao buscar os locatarios ativos."
            });
        });
};

//UPDATE
//Atualização por id para testar o ativo e inativo
exports.update = (req, res) => {
    const id = req.params.id

    Locatario.update(req.body, {
        where: {id : id}
    })
    
    .then(num => {
        if (num ==1) {
            res. send({
                message: "Locatario atualizado"
            });
        } else {
            res.send({
                message: `Não foi possivel atualizar o locatário com o id ${id} pois ele não foi localizado ou seu body está vazio`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao atualizar o tutorial de id ${id}`
        })
    })
}

//DELETE
exports.delete = (req, res) => {
    const id = req.params.id

    
    Locatario.destroy({where: {id : id}})
    
    .then(num => {
        if (num == 1) {
            res. send({
                message: "Locatario deletado com sucesso"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o locatario com o id ${id} pois ele não foi localizado ou seu body está vazio`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro interno ao deletar o locatario com id: ${id}`
        })
    })
}

//DELETE
exports.deleteAll = (req, res) => {
    Locatario.destroy({where: {},
    truncate: false})
    .then(nums => {
      res.send({ message: `${nums} Todos os locatários foram deletados com sucesso`});
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Erro ao deletar todos os locatarios"
      });
    });
  };