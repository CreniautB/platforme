 
const { Appli } = require("../models");

const utilsToken = require('../middleware/tokenUtils');
const appli = require("../models/appli");

exports.appliAdd = (req, res, next) => {

    const userId = utilsToken.getId(req)
    const appTitle = req.body.titleAppli
    const expireReq = req.body.expireDate

    Appli.findOne({ where : { title: appTitle}}).then(appli =>  {
        if(!appli){
            const appli = new Appli({
                UserId: userId,
                title: appTitle,
                expire: expireReq
            });
            appli.save()
            .then(() => {
                res.status(201).json({ message : 'new app added'})
            })
            .catch((error) => {
                res.status(301).json({ error})
            }) 
        }
        else{
            res.status(201).json({ message : "Already Added"})
        }
    })
};

exports.getAllappli = (req, res, next) => {

    const userId = utilsToken.getId(req)

    Appli.findAll({ where : { UserId : userId }}).then(applis => {
        res.status(200).json(applis)
    })
    .catch((error) => {
      res.status(400).json({ error})
    }) 
}

