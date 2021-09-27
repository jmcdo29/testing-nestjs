-- DropForeignKey
ALTER TABLE "cats" DROP CONSTRAINT "cats_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "cats" ADD CONSTRAINT "cats_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
