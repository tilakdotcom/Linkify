import appAssert from "../../common/API/AppAssert";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../../common/constants/http";
import { shortId } from "../../common/utils/shortId";
import prisma from "../../database/dbConnect";

type createShortUrlServiceProps = {
  longUrl: string;
  userAgent: string;
  ipAddress: string;
  userId?: string;
};

export const createShortUrlService = async (
  props: createShortUrlServiceProps
) => {
  const { longUrl, userAgent, ipAddress, userId } = props;

  const createUrl = await prisma.shortLink.create({
    data: {
      longLink: longUrl,
      shortLink: shortId(),
      userAgent,
      ipAddress,
      userId,
    },
  });

  appAssert(createUrl, INTERNAL_SERVER_ERROR, "Failed to create short url");
  return {
    createUrl,
  };
};

export const createShortUrlForPublicService = async (
  props: createShortUrlServiceProps
) => {
  const { longUrl, userAgent, ipAddress } = props;

  const createUrl = await prisma.shortLink.create({
    data: {
      longLink: longUrl,
      shortLink: shortId(),
      userAgent,
      ipAddress,
    },
  });

  appAssert(createUrl, INTERNAL_SERVER_ERROR, "Failed to create short url");
  return {
    createUrl,
  };
};

type getShortUrlServiceProps = {
  shortUrl: string;
  userAgent: string;
  ipAddress: string;
};

export const getShortUrlService = async (props: getShortUrlServiceProps) => {
  const { ipAddress, shortUrl, userAgent } = props;
  const uriExists = await prisma.shortLink.findFirst({
    where: {
      shortLink: shortUrl,
      isActive: true,
    },
  });

  appAssert(uriExists, NOT_FOUND, "uri is not valid or inactive");

  //updated visits
  const visitor = await prisma.visitors.create({
    data: {
      ipAddress,
      shortLinkId: uriExists?.id,
      userAgent,
    },
  });

  return {
    uri: uriExists,
    visitor,
  };
};

export const updateActiveStatusService = async (
  shortUrl: string,
  isActive: boolean
) => {
  const uriExists = await prisma.shortLink.findFirst({
    where: {
      shortLink: shortUrl,
    },
  });
  appAssert(uriExists, NOT_FOUND, "uri is not valid or inactive");

  const uri = await prisma.shortLink.update({
    where: {
      id: uriExists.id,
      shortLink: shortUrl,
    },
    data: {
      isActive,
    },
  });

  appAssert(uri, INTERNAL_SERVER_ERROR, "Failed to update short url status");
  return {
    uri,
  };
};

export const removeShortUrlService = async (
  shortUrl: string,
  userId: string
) => {
  const uriExists = await prisma.shortLink.findFirst({
    where: {
      shortLink: shortUrl,
      userId,
    },
  });
  appAssert(uriExists, NOT_FOUND, "uri is not valid or inactive");

  const uri = await prisma.shortLink.delete({
    where: {
      id: uriExists.id,
      shortLink: shortUrl,
    },
    include: {
      visitors: true,
    },
  });

  appAssert(uri, INTERNAL_SERVER_ERROR, "Failed to delete short url");
  return {
    uri,
  };
};

type updateShortUrlServiceProps = {
  shortUrl: string;
  longUrl: string;
  userId: string;
  userAgent: string;
  ipAddress: string;
};

export const updateShortUrlService = async ({
  longUrl,
  shortUrl,
  userId,
}: updateShortUrlServiceProps) => {
  const uriExists = await prisma.shortLink.findFirst({
    where: {
      shortLink: shortUrl,
      userId,
    },
  });
  appAssert(uriExists, NOT_FOUND, "uri is not valid or inactive");

  const uri = await prisma.shortLink.update({
    where: {
      id: uriExists.id,
      shortLink: shortUrl,
    },
    data: {
      longLink: longUrl,
      userAgent: uriExists.userAgent,
      ipAddress: uriExists.ipAddress,
    },
  });

  appAssert(uri, INTERNAL_SERVER_ERROR, "Failed to update short url");
  return {
    uri,
  };
};

type getShortUriDataWithLimitServiceProps = {
  userId: string;
  limit: number;
  page: number;
  orderByValue: string;
};

export const getShortUriDataWithLimitService = async (
  props: getShortUriDataWithLimitServiceProps
) => {
  const { userId, limit, page, orderByValue } = props;
  const skip = (page - 1) * limit;

  const allowedOrderByFields = [
    "createdAt",
    "clicks",
    "updatedAt",
    "expiresAt",
  ];
  appAssert(
    allowedOrderByFields.includes(orderByValue),
    BAD_REQUEST,
    "Invalid order by field"
  );

  const shortLink = await prisma.shortLink.findMany({
    where: { userId },
    orderBy: {
      [orderByValue]: "desc",
    },
    skip,
    take: limit,
  });

  appAssert(shortLink.length > 0, NOT_FOUND, "No URI found or inactive");

  const totalCount = await prisma.shortLink.count({
    where: { userId },
  });

  return {
    shortLink,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };
};
