const jwt = require ("jsonwebtoken");
const SECRET_KEY = "expense_tracker_secret";

const authMiddleware = (req,res,next)=>{
    const token = req.header.authorization;

    if(!token){
        return res.status(401).json({
            error : "Access Denied. Token not Generated"
        });
    }

    try{
        const verified = jwt.verify(token, SECRET_KEY);

        req.user = verified;

        next();
    }
    catch(err){
        return res.status(401).json({
            error:"Access Denied. Login Again"
        });
    }
};

module.export = authMiddleware;