
module.exports = app => {
    const locatarios = require ("../controllers/locatario.controller");

    var router = require ("express").Router();

    router.post("/", locatarios.create); 
    router.get("/", locatarios.findAll);
    router.get("/:situacao", locatarios.findAllSituacao);
    router.put("/:id", locatarios.update);
    router.delete("/:id", locatarios.delete);
    router.delete("/", locatarios.deleteAll);


    app.use('/api/locatarios', router)
}