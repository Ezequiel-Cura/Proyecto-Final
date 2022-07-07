import { Router } from "express"
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
const router = Router()

router.get("/", [authorization, admin], async (req: any, res: any) => {
    
})

export default router;