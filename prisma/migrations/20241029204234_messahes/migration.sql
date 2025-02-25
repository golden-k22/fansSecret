/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `_ChatUsers` DROP FOREIGN KEY `_ChatUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ChatUsers` DROP FOREIGN KEY `_ChatUsers_B_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP PRIMARY KEY,
    DROP COLUMN `chatId`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Chat`;

-- DropTable
DROP TABLE `_ChatUsers`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
