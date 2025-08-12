/*
  Warnings:

  - You are about to drop the column `codigoChamado` on the `chamados` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `chamados` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `chamados` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(1))`.
  - You are about to drop the column `avatar` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `nomeSocial` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `ultimoLogin` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `campos_chamados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tecnicochamado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipos_chamados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_permissoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `valores_campos_chamados` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subcategoriaId` to the `chamados` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `chamados` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `campos_chamados` DROP FOREIGN KEY `campos_chamados_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `chamados` DROP FOREIGN KEY `chamados_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `tecnicochamado` DROP FOREIGN KEY `TecnicoChamado_chamadoId_fkey`;

-- DropForeignKey
ALTER TABLE `tecnicochamado` DROP FOREIGN KEY `TecnicoChamado_tecnicoId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_permissoes` DROP FOREIGN KEY `usuarios_permissoes_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `valores_campos_chamados` DROP FOREIGN KEY `valores_campos_chamados_campoChamadoId_fkey`;

-- DropForeignKey
ALTER TABLE `valores_campos_chamados` DROP FOREIGN KEY `valores_campos_chamados_chamadoId_fkey`;

-- DropIndex
DROP INDEX `chamados_codigoChamado_key` ON `chamados`;

-- DropIndex
DROP INDEX `chamados_categoriaId_fkey` ON `chamados`;

-- AlterTable
ALTER TABLE `chamados` DROP COLUMN `codigoChamado`,
    DROP COLUMN `categoriaId`,
    ADD COLUMN `fechadoEm` DATETIME(3) NULL,
    ADD COLUMN `solucionadoEm` DATETIME(3) NULL,
    ADD COLUMN `subcategoriaId` INTEGER NOT NULL,
    MODIFY `descricao` TEXT NOT NULL,
    MODIFY `status` ENUM('NOVO', 'ATRIBUIDO', 'RESOLVIDO', 'REJEITADO', 'FECHADO') NOT NULL DEFAULT 'NOVO';

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `avatar`,
    DROP COLUMN `nomeSocial`,
    DROP COLUMN `ultimoLogin`,
    ADD COLUMN `permissao` ENUM('ADM', 'SUP', 'INF', 'VOIP', 'CAD', 'USR', 'DEV') NOT NULL DEFAULT 'USR',
    ALTER COLUMN `atualizadoEm` DROP DEFAULT;

-- DropTable
DROP TABLE `campos_chamados`;

-- DropTable
DROP TABLE `tecnicochamado`;

-- DropTable
DROP TABLE `tipos_chamados`;

-- DropTable
DROP TABLE `usuarios_permissoes`;

-- DropTable
DROP TABLE `valores_campos_chamados`;

-- CreateTable
CREATE TABLE `tecnicos_chamados` (
    `chamadoId` INTEGER NOT NULL,
    `tecnicoId` VARCHAR(191) NOT NULL,
    `atribuidoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`chamadoId`, `tecnicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    UNIQUE INDEX `subcategorias_categoriaId_nome_key`(`categoriaId`, `nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_subcategoriaId_fkey` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnicos_chamados` ADD CONSTRAINT `tecnicos_chamados_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnicos_chamados` ADD CONSTRAINT `tecnicos_chamados_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
