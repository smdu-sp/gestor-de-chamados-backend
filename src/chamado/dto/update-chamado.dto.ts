import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { StatusChamado } from '@prisma/client';

export class UpdateChamadoDto {
  @ApiPropertyOptional({ example: 'Novo título do chamado' })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiPropertyOptional({ example: 'Nova descrição' })
  @IsString({ message: 'Deve ser texto.' })
  @IsOptional()
  descricao?: string;

  @ApiPropertyOptional({
    enum: ['NOVO', 'ATRIBUIDO', 'RESOLVIDO', 'REJEITADO', 'FECHADO'],
  })
  @IsOptional()
  status?: StatusChamado;

  @ApiPropertyOptional({ description: 'ID da categoria relacionada (UUID).' })
  @IsString({ message: 'CategoriaId deve ser string.' })
  @IsOptional()
  categoriaId?: string;

  @ApiPropertyOptional({ description: 'ID da subcategoria relacionada (UUID).' })
  @IsString({ message: 'SubcategoriaId deve ser string.' })
  @IsOptional()
  subcategoriaId?: string;
}