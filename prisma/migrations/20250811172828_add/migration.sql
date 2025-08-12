/*
  Warnings:

  - Added the required column `categoriaId` to the `chamados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chamados` ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` ALTER COLUMN `atualizadoEm` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
