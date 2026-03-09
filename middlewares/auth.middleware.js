const jwt = require ("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.SECRET_KEY)
    console.log(token)
    if(!token){
        return res.status(401).json({
            error : "Access Denied. Token not Generated"
        });
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);

        req.user = verified;

        next();
    }
    catch(err){
        return res.status(401).json({
            error:err.message
        });
    }
};

module.exports = authMiddleware;