import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChamadoDto {
  @ApiProperty({ example: 'Erro no sistema X' })
  @IsString({ message: 'Deve ser texto.' })
  @IsNotEmpty({message: 'Não deve estar vazio.' })
  titulo: string;

  @ApiProperty({ example: 'Descrição detalhada do problema' })
  @IsString({ message: 'Deve ser texto.' })
  @IsNotEmpty({ message: 'Deve ser string' })
  descricao: string;

  @ApiProperty({ description: 'ID da categoria relacionada (UUID).' })
  @IsString({ message: 'CategoriaId deve ser string.' })
  @IsNotEmpty({ message: 'CategoriaId não deve estar vazio.' })
  categoriaId: string;

  @ApiProperty({ description: 'ID da subcategoria relacionada (UUID).' })
  @IsString({ message: 'SubcategoriaId deve ser string.' })
  @IsNotEmpty({ message: 'SubcategoriaId não deve estar vazio.' })
  subcategoriaId: string;
}
