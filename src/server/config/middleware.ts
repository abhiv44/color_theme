import jwt from "jsonwebtoken";
import path from 'path'
import * as fs from 'fs'

const publicKey =  fs.readFileSync(path.resolve('./public.key'),'utf-8');

export function isAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token,publicKey, {algorithm: 'RS256'} )
    next();
  } catch (error) {
    return res.status(401).json({ message: "Please Login" });
  }
}


export function isAllowed(...allowed) {
return (req,res,next) => {

if(!req.user) { return res.status(401).json({message: 'requires authentication'})}

if(allowed.includes(req.user.role)){
return next()
}

return res.status(403).json('Forbidden')
}

}