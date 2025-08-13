-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `avatar` TEXT NULL,
    `ultimoLogin` DATETIME(3) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `permissao` ENUM('ADM', 'SUP', 'INF', 'VOIP', 'CAD', 'USR', 'IMP', 'DEV') NOT NULL DEFAULT 'USR',

    UNIQUE INDEX `usuarios_login_key`(`login`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chamados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` TEXT NOT NULL,
    `status` ENUM('NOVO', 'ATRIBUIDO', 'RESOLVIDO', 'REJEITADO', 'FECHADO') NOT NULL DEFAULT 'NOVO',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `solucionadoEm` DATETIME(3) NULL,
    `fechadoEm` DATETIME(3) NULL,
    `categoriaId` INTEGER NOT NULL,
    `subcategoriaId` INTEGER NOT NULL,
    `criadorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_subcategoriaId_fkey` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamados` ADD CONSTRAINT `chamados_criadorId_fkey` FOREIGN KEY (`criadorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acompanhamentos` ADD CONSTRAINT `acompanhamentos_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acompanhamentos` ADD CONSTRAINT `acompanhamentos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnicos_chamados` ADD CONSTRAINT `tecnicos_chamados_chamadoId_fkey` FOREIGN KEY (`chamadoId`) REFERENCES `chamados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnicos_chamados` ADD CONSTRAINT `tecnicos_chamados_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
