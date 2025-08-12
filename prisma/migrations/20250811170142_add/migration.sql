-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `avatar` TEXT NULL,
    ADD COLUMN `ultimoLogin` DATETIME(3) NULL,
    ALTER COLUMN `atualizadoEm` DROP DEFAULT;
