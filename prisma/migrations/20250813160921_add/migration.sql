-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `usuarios` ALTER COLUMN `atualizadoEm` DROP DEFAULT,
    MODIFY `permissao` ENUM('ADM', 'SUP', 'INF', 'VOIP', 'CAD', 'USR', 'IMP', 'DEV') NOT NULL DEFAULT 'USR';

-- CreateTable
CREATE TABLE `acompanhamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` TEXT NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chamadoId` INTEGER NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_permissoes` (
    `categoriaId` INTEGER NOT NULL,
    `permissao` ENUM('ADM', 'SUP', 'INF', 'VOIP', 'CAD', 'USR', 'IMP', 'DEV') NOT NULL,

    PRIMARY KEY (`categoriaId`, `permissao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `acompanhamentos` ADD CONSTRAINT `acompanhamentos_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acompanhamentos` ADD CONSTRAINT `acompanhamentos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoria_permissoes` ADD CONSTRAINT `categoria_permissoes_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
