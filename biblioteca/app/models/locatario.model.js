module.exports = (sequelize, Sequelize) => {
    const Locatario = sequelize.define("tbl_locatario", {
        nome: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.BIGINT(11)
        },
        situacao: {
            type: Sequelize.BOOLEAN
        }
    });

    return Locatario
}