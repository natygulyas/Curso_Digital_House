//quando nosso servidor for chamar a model ele chama um INDEX por padrão
const dbConfig = require ("../config/db.config"); //busca as configurações de conexao

const Sequelize = require ("sequelize"); 

//abaixo os parametros para essa conexão
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

//basicamente o que precisa para configurar nossa rota do banco de dados
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.livros = require ("./livro.model")(sequelize, Sequelize);
db.locatarios = require ("./locatario.model")(sequelize, Sequelize);

module.exports = db; //exporta o db para o server