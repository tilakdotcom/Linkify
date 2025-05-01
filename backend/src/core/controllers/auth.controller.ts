import appAssert from "../../common/API/AppAssert";
import { loginSchema, registerSchema } from "../../common/schemas/auth";
import {
  clearAuthCookie,
  setAccessTokenCookie,
  setAuthCookies,
} from "../../common/utils/cookie";
import {
  BAD_REQUEST,
  CREATED,
  OK,
  UNAUTHORIZED,
} from "../../common/constants/http";
import prisma from "../../database/dbConnect";

import asyncHandler from "../../middlewares/asyncHandler.middleware";
import {
  createUserService,
  loginUserService,
  loginWithGoogleService,
  refreshTokenService,
} from "../services/auth.service";
import { validateFileImage } from "../../middlewares/file.middleware";

//signup
export const signup = asyncHandler(async (req, res) => {
  console.log("data", req.body);
  const body = registerSchema.parse(req.body);
  const { path } = validateFileImage(req.file as Express.Multer.File);
  //using services
  const { user } = await createUserService({
    ...body,
    avatar: path,
  });

  res.status(CREATED).json({
    message: "user created successfully",
    data: user,
    success: true,
  });
});

//login
export const login = asyncHandler(async (req, res) => {
  const userAgent = req.headers["user-agent"];
  const body = loginSchema.parse({
    ...req.body,
    userAgent: userAgent,
  });

  const { accessToken, refreshToken, user } = await loginUserService(body);

  const cooki = setAuthCookies({ res, accessToken, refreshToken });

  return cooki.status(OK).json({
    message: "Logged in successfully",
    data: user,
    success: true,
  });
});

//logout
export const logout = asyncHandler(async (req, res) => {
  const sessionId = req.sessionId;

  const session = await prisma.session.delete({
    where: { id: sessionId },
  });

  appAssert(session, BAD_REQUEST, "session not found  in the database");

  return clearAuthCookie(res).status(OK).json({
    message: "Logged out successfully",
    success: true,
  });
});

export const accessTokenRefresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Refresh token  not found");
  // userId
  const { accessToken } = await refreshTokenService(refreshToken);
  return setAccessTokenCookie({ res, accessToken }).status(OK).json({
    message: "Access token refreshed successfully",
    success: true,
  });
});

export const loginWithGoogle = asyncHandler(async (req, res) => {
  const { code } = req.query as unknown as { code: string };
  const userAgent = req.headers["user-agent"];

  const { accessToken, refreshToken, user, isNew } =
    await loginWithGoogleService({
      code,
      userAgent,
    });
  const cooki = setAuthCookies({ res, accessToken, refreshToken });

  return cooki.status(OK).json({
    message: "Logged in successfully",
    data: user,
    success: true,
    isNew,
  });
});
