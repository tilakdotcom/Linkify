import { ShortLink } from "../types/user";

export const tableDataForHome: ShortLink[] = [
  {
    shortLink: "https://sho.rt/abc123",
    longLink: "https://example.com/awesome-article",
    isActive: true,
    createdAt: "2025-04-15",
    id: "",
    userId: "",
    ipAddress: "",
    userAgent: "",
    updatedAt: "",
    expiresAt: null,
  },
  {
    shortLink: "https://sho.rt/xyz789",
    longLink:
      "https://youtube.com/watch?v=xyrtwertertwertwertewrtewrtewrtertewrtewrteertertertrewrtewrtertz",
    isActive: false,
    createdAt: "2025-03-10",
    id: "",
    userId: "",
    ipAddress: "",
    userAgent: "",
    updatedAt: "",
    expiresAt: null,
  },
  {
    shortLink: "https://sho.rt/def456",
    longLink: "https://linkedin.com/in/tilak",
    isActive: true,
    createdAt: "2025-04-01",
    id: "",
    userId: "",
    ipAddress: "",
    userAgent: "",
    updatedAt: "",
    expiresAt: null,
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
