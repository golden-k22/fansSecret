/*
  Warnings:

  - You are about to drop the column `hashtgs` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `hashtgs`,
    ADD COLUMN `hashtags` VARCHAR(191) NULL;
