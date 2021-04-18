//quando nosso servidor for chamar a model ele chama um INDEX por padrão
const dbConfig = require ("../config/db.config"); //busca as configurações de conexao

const Sequelize = require ("sequelize"); //cria a instancia para conectar

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

//aqui ele armazena tudo na const db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Inserir para o sequelize pra criar a tabela, ele vai jogar a model tutorial no objeto db:
db.livros = require ("./livro.model")(sequelize, Sequelize);
db.locatarios = require ("./locatario.model")(sequelize, Sequelize);

module.exports = db; //aqui ele exporta o db para o server