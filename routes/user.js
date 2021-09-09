module.exports = app => {
    const user = require("../controllers/userCTRL.js");
    const auth = require('../middleware/auth');
  
    let router = require("express").Router();
    
    router.post('/signup', user.signup);

    router.post('/login', user.login);

    router.delete('/:id', auth, user.deleteAcc);

    router.get('/name', auth, user.name)
  
    app.use('/user', router);
  };