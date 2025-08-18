import { ApiProperty } from "@nestjs/swagger";

export class SubCategoriaResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;
}

export class SubCategoriaPaginadoResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pagina: number;

  @ApiProperty()
  limite: number;

  @ApiProperty({ type: [SubCategoriaResponseDto] })
  data?: SubCategoriaResponseDto[];
}