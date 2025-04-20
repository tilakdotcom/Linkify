import { UserLinkTable } from "../types/user";

export const tableDataForHome: UserLinkTable[] = [
  {
    shortLink: "https://sho.rt/abc123",
    originalLink: "https://example.com/awesome-article",
    qrCode: "https://sho.rt/qr/abc123.png",
    clicks: 245,
    status: true,
    date: "2025-04-15",
  },
  {
    shortLink: "https://sho.rt/xyz789",
    originalLink:
      "https://youtube.com/watch?v=xyrtwertertwertwertewrtewrtewrtertewrtewrteertertertrewrtewrtertz",
    qrCode: "https://sho.rt/qr/xyz789.png",
    clicks: 109,
    status: false,
    date: "2025-03-10",
  },
  {
    shortLink: "https://sho.rt/def456",
    originalLink: "https://linkedin.com/in/tilak",
    qrCode: "https://sho.rt/qr/def456.png",
    clicks: 580,
    status: true,
    date: "2025-04-01",
  },
];

export const TableColumns = [
  { name: "Short Link" },
  { name: "Original Link" },
  { name: "QR Code" },
  { name: "Clicks" },
  { name: "Status" },
  { name: "Date" },
];
