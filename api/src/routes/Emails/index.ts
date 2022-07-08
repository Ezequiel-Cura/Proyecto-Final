import { Router } from "express"
const router = Router()
import News from "./news"

router.use("/news", News)

export default router;