/*
  Warnings:

  - You are about to drop the column `follwerId` on the `follower` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,followerId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `follower` DROP COLUMN `follwerId`,
    ADD COLUMN `followerId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Follower_userId_followerId_key` ON `Follower`(`userId`, `followerId`);
