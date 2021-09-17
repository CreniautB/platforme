module.exports = app => {

    const anion = require("../controllers/anionCTRL.js");

    let router = require("express").Router();
    
    router.post('/merge/:id', anion.anion);

    app.use('/anion', router);

  };