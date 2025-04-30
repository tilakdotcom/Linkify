export const userInfoURL = (
  token: string
) => `https://www.googleapis.com/oauth2/v1/
userinfo?alt=json&access_token=${token}`;
