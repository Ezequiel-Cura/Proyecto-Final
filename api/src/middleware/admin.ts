import User from "../models/User";

const admin = async (req: any, res: any, next: any) => {
    try {
      const user: any = await User.findById(req.userId)
      if(user.role !== 'admin') return res.status(403).send("User is not an admin")
      next()
    } catch (err: any) {
      res.sendStatus(403).send(err.message);
    }
}

export default admin