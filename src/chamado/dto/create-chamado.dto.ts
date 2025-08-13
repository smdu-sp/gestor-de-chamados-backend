import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateChamadoDto {
  @ApiProperty({ example: 'Erro no sistema X' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Descrição detalhada do problema' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoriaId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  subcategoriaId: number;
}
