import appAssert from "../../common/API/AppAssert";
import { passwordCompare, passwordHasher } from "../../common/utils/bcryptjs";
import { Now, thirtyDaysFromNow } from "../../common/utils/customTime";
import {
  accessTokenSignOptions,
  generateToken,
  refreshTokenSignOptions,
  verifyToken,
} from "../../common/utils/jwtHelper";
import { BAD_REQUEST, UNAUTHORIZED } from "../../common/constants/http";
import prisma from "../../database/dbConnect";
import uploadFileToCloudinary from "../../common/utils/cloudinary";
import oauthGoogle from "../../config/google";
import { userInfoURL } from "../../common/constants/URL";
import axios from "axios";

type CreateUserData = {
  email: string;
  password: string;
  avatar?: string;
};

export const createUserService = async (data: CreateUserData) => {
  const userExists = await prisma.user.findFirst({
    where: { email: data.email },
  });

  appAssert(!userExists, BAD_REQUEST, "user already exists");

  const hashedPassword = await passwordHasher(data.password);

  let uploadedImage;

  if (data.avatar) {
    uploadedImage = await uploadFileToCloudinary(data.avatar);
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      avatar: uploadedImage?.secure_url || "",
    },
  });

  const { password, ...rest } = user;

  return {
    user: rest,
  };
};

type LoginUserData = {
  userAgent?: string;
  email: string;
  password: string;
};

export const loginUserService = async (data: LoginUserData) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  //validation
  appAssert(user, BAD_REQUEST, "invalid login user details");

  //password check
  const isMatch = await passwordCompare(
    data.password,
    user.password ? user.password : ""
  );
  appAssert(isMatch, BAD_REQUEST, "invalid login user or password details");

  //create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: data.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  //generate tokens

  const refreshToken = generateToken(
    {
      userId: user.id,
      sessionId: session.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = generateToken(
    {
      userId: user.id,
      sessionId: session.id,
    },
    accessTokenSignOptions
  );
  const updateSession = await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken },
  });

  const { password, ...rest } = user;

  return {
    user: rest,
    accessToken,
    refreshToken,
    updateSession,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  const userId = verifyToken({
    token: refreshToken,
    options: refreshTokenSignOptions,
  });

  appAssert(userId.userId, UNAUTHORIZED, "invalid  refresh token");

  const session = await prisma.session.findFirst({
    where: {
      id: userId.sessionId,
      refreshToken: refreshToken,
      expiresAt: {
        gte: Now(),
      },
    },
  });

  appAssert(
    session && session.refreshToken === refreshToken,
    UNAUTHORIZED,
    "session not found  in the database or refresh token is invalid"
  );

  const accessToken = generateToken(
    {
      userId: session.userId,
      sessionId: session.id,
    },
    accessTokenSignOptions
  );

  return {
    accessToken,
    session,
  };
};

type LoginWithGogleProps = {
  code: string;
  userAgent?: string;
};

export const loginWithGoogleService = async ({
  code,
  userAgent,
}: LoginWithGogleProps) => {
  const googleRes = await oauthGoogle.getToken(code);
  oauthGoogle.setCredentials(googleRes.tokens);
  appAssert(
    googleRes.tokens?.access_token,
    BAD_REQUEST,
    "failed to get google res"
  );
  const userInfo = await axios.get(userInfoURL(googleRes.tokens?.access_token));
  const { email, name, picture } = userInfo.data;
  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password: null,
        avatar: picture || "",
        name,
      },
    });
  }

  //create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  //generate tokens

  const refreshToken = generateToken(
    {
      userId: user.id,
      sessionId: session.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = generateToken(
    {
      userId: user.id,
      sessionId: session.id,
    },
    accessTokenSignOptions
  );
  const updateSession = await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken },
  });

  const { password, ...rest } = user;
  let isNew = false;
  if (password === null) {
    isNew = true;
  }

  return {
    user: rest,
    accessToken,
    refreshToken,
    updateSession,
    isNew,
  };
};
