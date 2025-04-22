import { createUrlSchema } from "../../common/schemas/url";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import {
  createShortUrlForPublicService,
  createShortUrlService,
} from "../services/url.service";

export const createShortUrl = asyncHandler(async (req, res) => {
  const body = createUrlSchema.parse({
    userAgent: req.headers["user-agent"],
    longUrl: req.body.longUrl,
    ipAddress: req.ip,
  });

  await createShortUrlService({
    longUrl: body.longUrl,
    userAgent: body.userAgent as string,
    ipAddress: body.ipAddress as string,
    userId: req.userId,
  });
  res.status(200).json({ message: "Server is running", success: true });
});

export const createShortUrlForPublic = asyncHandler(async (req, res) => {
  const body = createUrlSchema.parse({
    userAgent: req.headers["user-agent"],
    longUrl: req.body.longUrl,
    ipAddress: req.ip,
  });

  const { createUrl } = await createShortUrlForPublicService({
    longUrl: body.longUrl,
    userAgent: body.userAgent as string,
    ipAddress: body.ipAddress as string,
  });
  res
    .status(200)
    .json({
      message: "uri created successfully",
      success: true,
      data: createUrl,
    });
});
