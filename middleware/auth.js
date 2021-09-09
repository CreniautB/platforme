const tokenUtils = require('./tokenUtils')

// utilisation d'un token afin de vérifier l'authentification de l'utilisateur
module.exports = (req, res, next) => {
  try {

    const userId = tokenUtils.getId(req)

    if (!userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};