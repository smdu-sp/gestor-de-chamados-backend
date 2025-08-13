import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';
import { StatusChamado } from '@prisma/client';

export class UpdateChamadoDto {
  @ApiPropertyOptional({ example: 'Novo título do chamado' })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiPropertyOptional({ example: 'Nova descrição' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiPropertyOptional({ enum: ['NOVO', 'EM_ANDAMENTO', 'SOLUCIONADO', 'FECHADO'] })
  @IsOptional()
  status?: StatusChamado;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  categoriaId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  subcategoriaId?: number;
}