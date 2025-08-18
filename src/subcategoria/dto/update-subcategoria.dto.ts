import { PartialType } from "@nestjs/mapped-types";
import { CreateSubCategoriaDto } from "./create-subcatgoria.dto";

export class UpdateSubCategoriaDto extends PartialType(CreateSubCategoriaDto) {}