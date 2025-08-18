import { Module } from "@nestjs/common";
import { SubCategoriaService } from "./subcategoria.service";
import { SubCategoriaController } from "./subcategoria.controller";

@Module({
  providers: [SubCategoriaService],
  controllers: [SubCategoriaController]
})
export class SubCategoriaModule {}