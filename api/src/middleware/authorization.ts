import jwt from "jsonwebtoken"

export default function authorization(req: any, res: any, next: any){
    const token = req.cookies.access_token
    if (!token) return res.sendStatus(403).send("no access token");
    try {
      const data:any = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.userId = data._id;
      next();
    } catch (err: any) {
      res.sendStatus(403).send(err.message);
    }
}