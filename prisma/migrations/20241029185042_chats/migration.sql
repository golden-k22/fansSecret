/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `receiverId`,
    ADD COLUMN `chatId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `lastActive` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatUsers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChatUsers_AB_unique`(`A`, `B`),
    INDEX `_ChatUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatUsers` ADD CONSTRAINT `_ChatUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatUsers` ADD CONSTRAINT `_ChatUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
