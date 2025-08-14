import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nome da categoria, mínimo 3 caracteres.' })
  @IsString({ message: 'Nome deve ser texto.' })
  @MinLength(3, { message: 'Nome deve ter ao menos 3 caracteres.' })
  nome: string;
}
