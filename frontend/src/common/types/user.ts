
export interface UserType {
  avatar: string;
  createAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
  verifiedEmail: false;
}

export interface UserLinkTable {
  shortLink: string;
  originalLink: string;
  qrCode: string;
  clicks: number;
  status: boolean;
  date: string;
}
