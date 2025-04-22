import { Router } from "express";
import {
  createShortUrlForPublic,
  getShortUrl,
  updateActiveStatus,
} from "../controllers/url.controller";

const router = Router();

// routes
router.route("/public").post(createShortUrlForPublic);
router.route("/:shortUrl").get(getShortUrl);
router.route("/status/:shortUrl").post(updateActiveStatus);

export default router;
