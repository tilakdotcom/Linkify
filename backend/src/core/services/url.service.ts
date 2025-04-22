type createShortUrlServiceProps = {
  longUrl: string;
  userAgent: string;
  ipAddress: string;
  userId?: string;
};

export const createShortUrlService = async (props: createShortUrlServiceProps) => {};

export const createShortUrlForPublicService = async (props: createShortUrlServiceProps) => {};
