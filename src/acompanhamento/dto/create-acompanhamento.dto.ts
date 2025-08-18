import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAcompanhamentoDto {
  @ApiProperty({ example: 'Este é um novo acompanhamento' })
  @IsNotEmpty({ message: 'Não deve estar vazio.' })
  @IsString({ message: 'Deve ser texto.' })
  conteudo: string;

  @ApiProperty({ description: 'ID do chamado relacionado (UUID).' })
  @IsNotEmpty({ message: 'ChamadoId não deve estar vazio.' })
  @IsString({ message: 'ChamadoId deve ser string.' })
  chamadoId: string;

  @ApiProperty({ description: 'ID do usuário relacionada (UUID).' })
  @IsNotEmpty({ message: 'UsuarioId não deve estar vazio.' })
  @IsString({ message: 'UsuarioId deve ser string.' })
  usuarioId: string;
}
