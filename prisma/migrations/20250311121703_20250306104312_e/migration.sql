/*
  Warnings:

  - You are about to drop the column `iamge` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `iamge`,
    ADD COLUMN `image` VARCHAR(191) NULL;
