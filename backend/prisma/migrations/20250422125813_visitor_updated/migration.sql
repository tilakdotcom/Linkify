-- DropForeignKey
ALTER TABLE "Visitors" DROP CONSTRAINT "Visitors_shortLinkId_fkey";

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
