module.exports = app => {

    const miniJeux = require("../controllers/miniJeux.js");

    let router = require("express").Router();
    
    router.get('/hello', miniJeux.hello);

    app.use('/miniJeux', router);
  };