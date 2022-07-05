import jwt from "jsonwebtoken"

export default function authorization(req: any, res: any, next: any){
  try {
    const token = req.cookies.access_token
    if (!token) return res.sendStatus(401).end()
      const data:any = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.userId = data._id;
      next();
    } catch (err: any) {
      return res.sendStatus(401).send(err.message);
    }
}