module.exports = app => {
    const appli = require("../controllers/appliCTRL.js");
  
    let router = require("express").Router();
    
    router.post('/appliAdd', appli.appliAdd);
    router.get('/getAllAppli', appli.getAllappli)

    app.use('/appli', router);
  };