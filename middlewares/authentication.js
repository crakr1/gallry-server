import jwt from "jsonwebtoken"

const isLoggedIn = (req, res, next) => {
    const authToken = req.headers.authorization
    if(authToken) {
        const token = authToken.split(" ")[1]
        try{
            const deCoded = jwt.verify(token, process.env.JWT)
            req.user = deCoded
            next()        
        } catch(e) {
            return res.status(401).json({message: "token undefined"})
        }
    } else {
        return res.status(401).json({message: "no token provided"})
    }
 
}

export default isLoggedIn