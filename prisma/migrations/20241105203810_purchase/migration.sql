/*
  Warnings:

  - You are about to drop the `Puschases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Puschases` DROP FOREIGN KEY `Puschases_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `Puschases` DROP FOREIGN KEY `Puschases_sellerId_fkey`;

-- DropTable
DROP TABLE `Puschases`;

-- CreateTable
CREATE TABLE `Purchases` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseType` VARCHAR(191) NOT NULL,
    `sellerId` VARCHAR(191) NOT NULL,
    `buyerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
