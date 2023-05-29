const jwt = require('jsonwebtoken');
const verifyToken=async(req,res,next)=>{
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
 if (!token) {
 return res.sendStatus(401);
 }
 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
 if (err) {
 return res.sendStatus(401);
 }
 req.user = user;
 next();
 });
 }
module.exports = verifyToken; 

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id ||req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("Not allowed !");
        }
    })
}
module.exports = { verifyToken,verifyTokenAndAuthorization};