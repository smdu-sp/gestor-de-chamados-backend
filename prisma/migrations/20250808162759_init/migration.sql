/*
  Warnings:

  - You are about to drop the column `permissao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `agendamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coordenadorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `motivos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `agendamentos` DROP FOREIGN KEY `agendamentos_coordenadoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `agendamentos` DROP FOREIGN KEY `agendamentos_motivoId_fkey`;

-- DropForeignKey
ALTER TABLE `agendamentos` DROP FOREIGN KEY `agendamentos_tecnicoId_fkey`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `permissao`;

-- DropTable
DROP TABLE `agendamentos`;

-- DropTable
DROP TABLE `coordenadorias`;

-- DropTable
DROP TABLE `motivos`;

-- CreateTable
CREATE TABLE `usuarios_permissoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` VARCHAR(191) NOT NULL,
    `permissao` ENUM('DEV', 'ADM', 'SUP', 'INF', 'CAD', 'USR', 'VOIP') NOT NULL,

    UNIQUE INDEX `usuarios_permissoes_usuarioId_permissao_key`(`usuarioId`, `permissao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoChamado` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `status` ENUM('ABERTO', 'EM_ANDAMENTO', 'RESOLVIDO', 'FECHADO') NOT NULL DEFAULT 'ABERTO',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `criadorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `chamados_codigoChamado_key`(`codigoChamado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TecnicoChamado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tecnicoId` VARCHAR(191) NOT NULL,
    `chamadoId` INTEGER NOT NULL,
    `entrouEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saiuEm` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoriaId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipoCampo` ENUM('TEXTO', 'NUMERO', 'SELECAO', 'DATA', 'BOOLEANO') NOT NULL,
    `obrigatorio` BOOLEAN NOT NULL DEFAULT false,
    `ordem` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valores_campos_chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chamadoId` INTEGER NOT NULL,
    `campoChamadoId` INTEGER NOT NULL,
    `valor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios_permissoes` ADD CONSTRAINT `usuarios_permissoes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `tipos_chamados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_criadorId_fkey` FOREIGN KEY (`criadorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TecnicoChamado` ADD CONSTRAINT `TecnicoChamado_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TecnicoChamado` ADD CONSTRAINT `TecnicoChamado_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_chamados` ADD CONSTRAINT `campos_chamados_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `tipos_chamados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valores_campos_chamados` ADD CONSTRAINT `valores_campos_chamados_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valores_campos_chamados` ADD CONSTRAINT `valores_campos_chamados_campoChamadoId_fkey` FOREIGN KEY (`campoChamadoId`) REFERENCES `campos_chamados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
