import {
  createUrlSchema,
  getUrlSchema,
  updateActiveStatusSchema,
} from "../../common/schemas/url";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import {
  createShortUrlForPublicService,
  createShortUrlService,
  getShortUriDataWithLimitService,
  getShortUrlService,
  removeShortUrlService,
  updateActiveStatusService,
  updateShortUrlService,
} from "../services/url.service";

export const createShortUrlForUser = asyncHandler(async (req, res) => {
  const body = createUrlSchema.parse({
    userAgent: req.headers["user-agent"],
    longUrl: req.body.longUrl,
    ipAddress: req.ip,
  });

  const { createUrl } = await createShortUrlService({
    longUrl: body.longUrl,
    userAgent: body.userAgent as string,
    ipAddress: body.ipAddress as string,
    userId: req.userId,
  });
  res.status(200).json({
    message: "uri created successfully",
    success: true,
    data: createUrl,
  });
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
  res.status(200).json({
    message: "uri created successfully",
    success: true,
    data: createUrl,
  });
});

export const getShortUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const body = getUrlSchema.parse({
    userAgent: req.headers["user-agent"],
    shortUrl: shortUrl,
    ipAddress: req.ip,
  });

  const { uri } = await getShortUrlService({
    ipAddress: body.ipAddress as string,
    shortUrl: body.shortUrl,
    userAgent: body.userAgent as string,
  });
  res.status(200).redirect(uri.longLink);
});

export const updateActiveStatus = asyncHandler(async (req, res) => {
  const { shortUrl, isActive } = updateActiveStatusSchema.parse({
    shortUrl: req.params.shortUrl,
    isActive: req.body.isActive,
  });

  const { uri } = await updateActiveStatusService(shortUrl, isActive);
  res.status(200).json({
    message: "uri updated successfully",
    success: true,
    data: uri,
  });
});

export const removeShortUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const userId = req.userId as string;

  const { uri } = await removeShortUrlService(shortUrl, userId);
  res.status(200).json({
    message: "uri deleted successfully",
    success: true,
    data: uri,
  });
});

export const updateShortUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const userId = req.userId as string;
  const body = createUrlSchema.parse({
    userAgent: req.headers["user-agent"],
    longUrl: req.body.longUrl,
    ipAddress: req.ip,
  });

  const { uri } = await updateShortUrlService({
    shortUrl,
    longUrl: body.longUrl,
    userId,
    userAgent: body.userAgent as string,
    ipAddress: body.ipAddress as string,
  });
  res.status(200).json({
    message: "uri updated successfully",
    success: true,
    data: uri,
  });
});

export const getShortUriDataWithLimit = asyncHandler(async (req, res) => {
  const userId = req.userId as string;
  const { limit, page, orderByValue } = req.query as unknown as {
    limit: number;
    page: number;
    orderByValue: string;
  };

  const { currentPage, shortLink, totalCount, totalPages } =
    await getShortUriDataWithLimitService({
      userId,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      orderByValue: orderByValue || "createdAt",
    });
  res.status(200).json({
    message: "uri fetched successfully",
    success: true,
    data: {
      shortLink,
      currentPage: Number(currentPage),
      totalCount: Number(totalCount),
      totalPages: Number(totalPages),
    },
  });
});
