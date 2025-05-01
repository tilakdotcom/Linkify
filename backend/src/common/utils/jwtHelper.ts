import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/getEnv";
import ApiError from "../API/ApiError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
type AccessTokenParams = {
  userId: string;
  sessionId?: string;
};

type RefreshTokenParams = {
  userId: string;
  sessionId?: string;
};

type SignOptionsWithSecret = SignOptions & {
  secret: string;
};

const defaultOptions: SignOptions = {
  audience: "user",
};

export const accessTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: "7d",
  secret: ACCESS_TOKEN_SECRET,
};

export const refreshTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: "30d",
  secret: REFRESH_TOKEN_SECRET,
};

export const generateToken = (
  payload: AccessTokenParams | RefreshTokenParams,
  options: SignOptionsWithSecret
) => {
  const { secret, ...signOpts } = options;
  return jwt.sign(payload, secret, {
    ...defaultOptions,
    ...signOpts,
  });
};

type verifyOptionsWithSecret = VerifyOptions & {
  secret: string;
};

type verifyTokenParams = {
  token: string;
  options?: verifyOptionsWithSecret;
};

export const verifyToken = ({
  token,
  options = accessTokenSignOptions,
}: verifyTokenParams) => {
  const { secret, ...verifyOpts } = options || {};

  try {
    const decoded = jwt.verify(token, secret, {
      ...verifyOpts,
      ...defaultOptions,
    });
    return decoded as AccessTokenParams | RefreshTokenParams;
  } catch (error: any) {
    console.log("error in verifyToken", error);
    throw new ApiError(INTERNAL_SERVER_ERROR, "Unable to verify token ");
  }
};
