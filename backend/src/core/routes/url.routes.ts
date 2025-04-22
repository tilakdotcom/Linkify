import { Router } from "express";
import {
  createShortUrlForPublic,
  createShortUrlForUser,
  getShortUriDataWithLimit,
  getShortUrl,
  removeShortUrl,
  updateActiveStatus,
  updateShortUrl,
} from "../controllers/url.controller";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router();

// routes
router.route("/public").post(createShortUrlForPublic);
router.route("/:shortUrl").get(getShortUrl);
router.route("/status/:shortUrl").post(updateActiveStatus);

// use user middleware to protect the routes

router.use(verifyUser);
router.route("/user").post(createShortUrlForUser);
router.route("/update/:shortUrl").post(updateShortUrl);
router.route("/remove/:shortUrl").delete(removeShortUrl);
router.route("/").get(getShortUriDataWithLimit);

export default router;
