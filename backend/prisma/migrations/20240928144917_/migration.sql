/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryID` on the `category` table. All the data in the column will be lost.
  - Added the required column `id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Category_categoryCode_key` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `categoryID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ALTER COLUMN `status` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);
