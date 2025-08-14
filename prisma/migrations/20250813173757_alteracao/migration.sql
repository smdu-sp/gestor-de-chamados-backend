/*
  Warnings:

  - The primary key for the `acompanhamentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categoria_permissoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `chamados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subcategorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tecnicos_chamados` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `acompanhamentos` DROP FOREIGN KEY `acompanhamentos_chamadoId_fkey`;

-- DropForeignKey
ALTER TABLE `categoria_permissoes` DROP FOREIGN KEY `categoria_permissoes_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_subcategoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `subcategorias` DROP FOREIGN KEY `subcategorias_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `tecnicos_chamados` DROP FOREIGN KEY `tecnicos_chamados_chamadoId_fkey`;

-- DropIndex
DROP INDEX `acompanhamentos_chamadoId_fkey` ON `acompanhamentos`;

-- DropIndex
DROP INDEX `chamados_categoriaId_fkey` ON `chamados`;

-- DropIndex
DROP INDEX `chamados_subcategoriaId_fkey` ON `chamados`;

-- AlterTable
ALTER TABLE `acompanhamentos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `chamadoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categoria_permissoes` DROP PRIMARY KEY,
    MODIFY `categoriaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`categoriaId`, `permissao`);

-- AlterTable
ALTER TABLE `categorias` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `chamados` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `subcategoriaId` VARCHAR(191) NOT NULL,
    MODIFY `categoriaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `subcategorias` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `categoriaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tecnicos_chamados` DROP PRIMARY KEY,
    MODIFY `chamadoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`chamadoId`, `tecnicoId`);

-- AlterTable
ALTER TABLE `usuarios` ALTER COLUMN `atualizadoEm` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_subcategoriaId_fkey` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acompanhamentos` ADD CONSTRAINT `acompanhamentos_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnicos_chamados` ADD CONSTRAINT `tecnicos_chamados_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoria_permissoes` ADD CONSTRAINT `categoria_permissoes_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
