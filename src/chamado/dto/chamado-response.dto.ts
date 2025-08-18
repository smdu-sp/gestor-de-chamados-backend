import { ApiProperty } from '@nestjs/swagger';
import { StatusChamado } from '@prisma/client';
import { UsuarioResponseDTO } from 'src/usuarios/dto/usuario-response.dto';

export class ChamadoResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty({ enum: StatusChamado })
  status: StatusChamado;

  @ApiProperty()
  categoriaId: string;

  @ApiProperty()
  subcategoriaId?: string;

  @ApiProperty({ type: UsuarioResponseDTO })
  criador: UsuarioResponseDTO;

  @ApiProperty()
  criadoEm: Date;

  @ApiProperty()
  atualizadoEm: Date;
}

export class ChamadoPaginadoResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pagina: number;

  @ApiProperty()
  limite: number;

  @ApiProperty({ type: [ChamadoResponseDto] })
  data: ChamadoResponseDto[];
}

export class ChamadoStatusResponseDto {
  @ApiProperty()
  atualizado: boolean;
}
