const Router = require('express');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const authController = Router();

function generateAccessToken(param){
    return jwt.sign(param, TOKEN_SECRET);
}

function authenticateToken(req, res){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
 
    if(token == null){
      return res.sendStatus(401);
    }
 
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if(err){
            return res.sendStatus(403);
        }

        console.log(user + " VALIDADO!!")

    })
}

authController.post('/', (req, res) => {
    const { username, password } = req.body;

    // Aquí verificarías si el nombre de usuario y la contraseña son válidos en tu base de datos o en cualquier otro lugar
    const isValidUser = (username === "marian" && password == "1234");
    if (!isValidUser) {
      return res.status(401).json({ message: 'Invalid username or password' }); // si no son válidos, devuelve un error de no autorizado
    }
  
    const token = generateAccessToken(username);
    res.json(token);
});

module.exports = {authController, authenticateToken};