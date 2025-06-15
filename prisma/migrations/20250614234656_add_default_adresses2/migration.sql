/*
  Warnings:

  - You are about to drop the column `defaultBillingAdressId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `defaultShippingAdressId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "defaultBillingAdressId",
DROP COLUMN "defaultShippingAdressId",
ADD COLUMN     "defaultBillingAdress" INTEGER,
ADD COLUMN     "defaultShippingAdress" INTEGER;
