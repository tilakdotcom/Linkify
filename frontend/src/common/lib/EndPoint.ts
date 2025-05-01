export const registerUserRequest = "/auth/register";
export const loginUserRequest = "/auth/login";
export const logoutUserRequest = "/auth/logout";
export const getUserRequest = "/user";
export const uriShortPublicRequest = "/uri/public";
export const uriShortUserRequest = "/uri/user";
export const uriDataRequest = (page: string) => `/uri?page=${page}`;
export const uriUserRedirectRequest = (short: string) => `/uri/${short}`;
export const uriDeleteRequest = (short: string) => `/uri/remove/${short}`;
export const uriUpdateRequest = (short: string) => `/uri/update/${short}`;
export const uriUpdateStatusRequest = (short: string) => `/uri/status/${short}`;

export const loginWithGoogleRequest = (code: string) => `/auth/google-login?code=${code}`;
