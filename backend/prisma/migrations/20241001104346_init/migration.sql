-- CreateTable
CREATE TABLE `PurchaseOrder` (
    `poID` INTEGER NOT NULL AUTO_INCREMENT,
    `poNumber` INTEGER NOT NULL,
    `supplierID` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `expectedDeliverDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `locationID` INTEGER NOT NULL,
    `createdByID` INTEGER NOT NULL,
    `modifiedByID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PurchaseOrder_poNumber_key`(`poNumber`),
    PRIMARY KEY (`poID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrderItem` (
    `poItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `poID` INTEGER NOT NULL,
    `itemID` INTEGER NOT NULL,
    `uom` VARCHAR(191) NOT NULL,
    `unitCost` DOUBLE NOT NULL,
    `orderQty` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`poItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poReceivingItem` (
    `poReceivingItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `itemID` INTEGER NOT NULL,
    `uom` VARCHAR(191) NOT NULL,
    `receivedQty` INTEGER NOT NULL,
    `unitCost` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`poReceivingItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poReceiving` (
    `poReceivingID` INTEGER NOT NULL AUTO_INCREMENT,
    `poID` INTEGER NOT NULL,
    `receivedDate` DATETIME(3) NOT NULL,
    `referenceNumber` VARCHAR(191) NOT NULL,
    `totalCost` DOUBLE NOT NULL,
    `totalQty` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `receivedByID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`poReceivingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poSupplier` (
    `supplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierName` VARCHAR(191) NOT NULL,
    `contactDetails` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdByID` INTEGER NOT NULL,
    `modifiedByID` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`supplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
