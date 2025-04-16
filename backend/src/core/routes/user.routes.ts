import { Router } from "express";
import verifyUser from "../../middlewares/auth.middleware";
import { userAccessHandler, userPasswordChangeHandler, userProfileImageHandler, userResetPasswordHandler } from "../controllers/user.controller";
import upload from "../../middlewares/multer.middleware";

const router = Router()

router.route("/forgot-password").get(userResetPasswordHandler)

router.route("/reset-password/:token").patch(userPasswordChangeHandler)

router.use(verifyUser)
// routes


router.route("/").get(userAccessHandler)

router.route("/profile").patch(upload.single("avatar"),userProfileImageHandler)

export default router