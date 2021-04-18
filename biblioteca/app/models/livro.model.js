//Sequelize, quero que vc defina minha model desse jeito:
module.exports = (sequelize, Sequelize) => {
    const Livro = sequelize.define("tbl_livro", {
        nome: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        sinopse: {
            type: Sequelize.STRING
        },
        dataLancamento: {
            type: Sequelize.DATEONLY
        },
        dataAluguel: {
            type: Sequelize.DATEONLY
        },
        estado: {
            type: Sequelize.STRING
        }
    });

    return Livro
}