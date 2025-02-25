/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `collaboratetags` VARCHAR(191) NULL,
    ADD COLUMN `isChecked` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `birthday` VARCHAR(191) NULL,
    ADD COLUMN `financeVerificationFileLink` VARCHAR(191) NULL,
    ADD COLUMN `firstname` VARCHAR(191) NULL,
    ADD COLUMN `idVerificationFileLink` VARCHAR(191) NULL,
    ADD COLUMN `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isVerifySubmitted` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `lastname` VARCHAR(191) NULL,
    ADD COLUMN `selfieLink` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `AdminMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `m_title` VARCHAR(191) NOT NULL,
    `m_content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BannedWord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(191) NOT NULL,
    `banned_state` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BannedList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ban_active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BannedBehavior` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` VARCHAR(191) NOT NULL,
    `receiverId` VARCHAR(191) NOT NULL,
    `bannedword` VARCHAR(191) NOT NULL,
    `send_content` VARCHAR(191) NOT NULL,
    `send_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BannedActive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ban_active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditHistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `fromUserId` VARCHAR(191) NOT NULL,
    `toUserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceHistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
