import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateSubCategoriaDto {
  @ApiProperty({ description: 'Nome da subcategoria, mínimo 3 caracteres.' })
  @IsString({ message: 'Nome deve ser texto.' })
  @MinLength(3, { message: 'Nome deve ter ao menos 3 caracteres.' })
  nome: string;

  @ApiProperty({ description: 'ID da categoria relacionada (UUID).' })
  @IsString({ message: 'CategoriaId deve ser string.' })
  @IsNotEmpty({ message: 'CategoriaId não deve estar vazio.' })
  categoriaId: string;
}
