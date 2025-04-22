import appAssert from "../../common/API/AppAssert";
import { INTERNAL_SERVER_ERROR } from "../../common/constants/http";
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
