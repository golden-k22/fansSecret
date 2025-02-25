-- CreateTable
CREATE TABLE `Puschases` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseType` VARCHAR(191) NOT NULL,
    `sellerId` VARCHAR(191) NOT NULL,
    `buyerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Puschases` ADD CONSTRAINT `Puschases_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Puschases` ADD CONSTRAINT `Puschases_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
