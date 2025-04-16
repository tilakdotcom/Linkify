import appAssert from "../../common/API/AppAssert";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "../../common/constants/http";
import uploadFileToCloudinary from "../../common/utils/cloudinary";
import prisma from "../../database/dbConnect";
import { verificationType } from "@prisma/client";
import ApiError from "../../common/API/ApiError";
import { fifteenMinuteFromNow, Now } from "../../common/utils/customTime";
import { CLIENT_URI } from "../../common/constants/getEnv";
import { passwordHasher } from "../../common/utils/bcryptjs";

type UserAvatar = {
  avatar: string;
  userId: string;
};

export const userAvatarService = async (data: UserAvatar) => {
  const user = await prisma.user.findFirst({
    where: { id: data.userId },
  });

  appAssert(user, BAD_REQUEST, "user not found");

  const avatar = await uploadFileToCloudinary(data.avatar);

  const updateUserAvatar = await prisma.user.update({
    where: { id: user.id },
    data: { avatar: avatar.secure_url },
  });

  const { password, ...rest } = updateUserAvatar;

  return { user: rest };
};

type UserPasswordResetRequestType = {
  email: string;
};

export const userPasswordResetRequestService = async (
  data: UserPasswordResetRequestType
) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  appAssert(user, BAD_REQUEST, "user not found");

  const count = await prisma.verification.count({
    where: {
      userId: user.id,
      type: verificationType.RESET_PASSWORD,
      expiresAt: {
        gte: Now(),
      },
    },
  });

  if (count > 2) {
    throw new ApiError(
      BAD_REQUEST,
      "You have exceeded the maximum number of documents"
    );
  }

  const passwordResetVerificationCode = await prisma.verification.create({
    data: {
      userId: user.id,
      type: verificationType.RESET_PASSWORD,
      expiresAt: fifteenMinuteFromNow(),
    },
  });

  const url = `${CLIENT_URI}/reset-password/${passwordResetVerificationCode.id}`;

  return { passwordResetVerificationCode };
};

type UserPasswordChangeServiceType = {
  newPassword: string;
  passwordResetToken: string;
};

export const userPasswordChangeService = async (
  data: UserPasswordChangeServiceType
) => {
  const verification = await prisma.verification.findFirst({
    where: {
      id: data.passwordResetToken,
      type: verificationType.RESET_PASSWORD,
      expiresAt: {
        gte: Now(),
      },
    },
  });
  appAssert(verification, BAD_REQUEST, "reset password token has expired");

  const user = await prisma.user.findFirst({
    where: { id: verification.userId },
  });
  appAssert(user, INTERNAL_SERVER_ERROR, "reset password failed");

  const hashedPassword = await passwordHasher(data.newPassword);

  const updateUserPaword = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  //delete old sessions
  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  await prisma.verification.deleteMany({
    where: {
      userId: user.id,
      type: verificationType.RESET_PASSWORD,
    },
  });

  const { password, ...rest } = updateUserPaword;

  return { user: rest };
};
