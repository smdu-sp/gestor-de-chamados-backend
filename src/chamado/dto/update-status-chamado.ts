import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusChamado } from '@prisma/client';

export class UpdateStatusChamadoDto {
  @ApiProperty({
    enum: StatusChamado,
    description: 'Novo status do chamado',
  })
  @IsEnum(StatusChamado)
  status: StatusChamado;
}
