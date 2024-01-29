const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");

function authmiddleware(req,res,next){
    const token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "No token found for user verification"
        })
    }
    const actualToken = token.split(" ")[1];
    
    try {

        // Jwt.verify() function provides the decoded value after verification
        const decodedValue = jwt.verify(actualToken, JWT_Secret);
        
        //putting the userid in request object
        req.decodedValue = decodedValue;
        req.userId = decodedValue.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({})
    }

}

function authcheck(req,res,next){
    const token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "No token found for user verification"
        })
    }
    const actualToken = token.split(" ")[1];
    try{
        const decodedValue = jwt.verify(actualToken, JWT_Secret)
        req.decodedValue = decodedValue;
        req.userId = decodedValue.userId;
        next();
    } catch(e){
        // if(e.name === 'TokenExpiredError'){
        //     return res.redirect("http://localhost:5173/")
        // }

        console.log(e);
        console.error("Error: ", e)
        return res.status(403).json({
            msg: "token expired"
        })
    }

}

module.exports = {
    authmiddleware,
    authcheck
}