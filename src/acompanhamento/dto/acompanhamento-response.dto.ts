import { ApiProperty } from '@nestjs/swagger';

export class AcompanhamentoResponseDto {
  @ApiProperty()
  conteudo: string;

  @ApiProperty()
  chamadoId: string;

  @ApiProperty()
  usuarioId: string;
}