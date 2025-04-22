import { Router } from "express";
import { createShortUrlForPublic } from "../controllers/url.controller";


const router = Router()


// routes
router.route("/public").post(createShortUrlForPublic)




export default router