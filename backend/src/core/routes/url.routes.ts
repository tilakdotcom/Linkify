import { Router } from "express";
import {
  createShortUrlForPublic,
  getShortUrl,
} from "../controllers/url.controller";

const router = Router();

// routes
router.route("/public").post(createShortUrlForPublic);
router.route("/:shortUrl").get(getShortUrl);

export default router;
