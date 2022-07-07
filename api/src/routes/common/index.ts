import { Router } from "express"
const router = Router()
import allReviews from "./allReviews"

router.use("/allReviews", allReviews)

export default router