import { Router } from "express";
import {
  login,
  accessTokenRefresh,
  logout,
  signup,
  loginWithGoogle,
} from "../controllers/auth.controller";
import verifyUser from "../../middlewares/auth.middleware";
import upload from "../../middlewares/multer.middleware";

const router = Router();

router.route("/register").post(upload.single("avatar"), signup);
router.route("/login").post(login);
router.route("/refresh").get(accessTokenRefresh);
router.route("/google-login").get(loginWithGoogle);

router.use(verifyUser);
router.route("/logout").get(logout);

export default router;
