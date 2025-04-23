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

export interface ShortLink {
  id: string;
  userId: string;
  shortLink: string;
  longLink: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}