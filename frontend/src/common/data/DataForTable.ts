import { ShortLink } from "../types/user";

export const tableDataForHome: ShortLink[] = [
  {
    shortLink: "git",
    longLink: "https://github.com/tilakdotcom",
    isActive: true,
    createdAt: "2025-04-26T11:20:36.018Z",
    id: "1",
    userId: "",
    ipAddress: "",
    userAgent: "",
    visits: "550",
    updatedAt: "",
    expiresAt: null,
  },
  {
    shortLink: "linkedin",
    longLink: "https://www.linkedin.com/in/tilakdotcom/",
    isActive: true,
    createdAt: "2025-04-26T11:20:36.018Z",
    id: "2",
    userId: "",
    ipAddress: "",
    userAgent: "",
    updatedAt: "",
    expiresAt: null,
    visits: "450",
  },
  {
    shortLink: "tilak",
    longLink: "https://tilakdotcom.vercel.app/",
    isActive: true,
    createdAt: "2025-04-26T11:20:36.018Z",
    id: "3",
    userId: "",
    ipAddress: "",
    userAgent: "",
    updatedAt: "",
    expiresAt: null,
    visits: "470",
  },
];

export const TableColumns = [
  {
    name: "short link",
    isToAdd: true,
  },
  {
    name: "original link",
    isToAdd: true,
  },
  {
    name: "qr code",
    isToAdd: true,
  },
  {
    name: "clicks",
    isToAdd: true,
  },
  {
    name: "status",
    isToAdd: true,
  },
  {
    name: "date",
    isToAdd: true,
  },
  {
    name: "actions",
    isToAdd: false,
  },
];
