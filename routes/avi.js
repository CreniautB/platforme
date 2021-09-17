module.exports = app => {

    const avi = require("../controllers/aviCTRL.js");

    let router = require("express").Router();
    
    router.post('/merge/:id', avi.avi);

    app.use('/avi', router);

  };