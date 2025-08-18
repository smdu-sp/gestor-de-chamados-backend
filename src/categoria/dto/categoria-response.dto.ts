import { ApiProperty } from '@nestjs/swagger';

export class CategoriaResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;
}

export class CategoriaPaginadoResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pagina: number;

  @ApiProperty()
  limite: number;

  @ApiProperty({ type: [CategoriaResponseDto] })
  data?: CategoriaResponseDto[];
}
