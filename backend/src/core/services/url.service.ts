import appAssert from "../../common/API/AppAssert";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../common/constants/http";
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
) => {};

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
