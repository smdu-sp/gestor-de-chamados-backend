import {
  ChamadoPaginadoResponseDto,
  ChamadoResponseDto,
  ChamadoStatusResponseDto,
} from './dto/chamado-response.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ChamadoService } from './chamado.service';
import { CreateChamadoDto } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { UpdateStatusChamadoDto } from './dto/update-status-chamado';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Chamados')
@ApiBearerAuth()
@Controller('chamados')
export class ChamadoController {
  constructor(private readonly chamadoService: ChamadoService) {}

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
    @Query('status') status?: string,
    @Query('categoriaId') categoriaId?: string,
    @Query('subcategoriaId') subcategoriaId?: string,
  ): Promise<ChamadoPaginadoResponseDto> {
    return this.chamadoService.buscarTudo(
      +pagina,
      +limite,
      busca,
      status as any,
      categoriaId,
      subcategoriaId,
    );
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-por-id/:id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<ChamadoResponseDto> {
    return this.chamadoService.findOne(id);
  }

  @Permissoes('ADM', 'USR')
  @Post('criar')
  create(
    @UsuarioAtual() usuario: Usuario,
    @Body() createChamadoDto: CreateChamadoDto,
  ): Promise<ChamadoResponseDto> {
    return this.chamadoService.create(createChamadoDto, usuario.id);
  }

  @Permissoes('ADM', 'TEC')
  @Put('atualizar/:id')
  update(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: string,
    @Body() updateChamadoDto: UpdateChamadoDto,
  ): Promise<ChamadoResponseDto> {
    return this.chamadoService.update(id, updateChamadoDto, usuario.id);
  }

  @Permissoes('ADM', 'TEC')
  @Patch('atualizar-status/:id')
  mudarStatus(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: string,
    @Body() mudarStatusDto: UpdateStatusChamadoDto,
  ): Promise<ChamadoStatusResponseDto> {
    return this.chamadoService.mudarStatus(
      id,
      mudarStatusDto.status,
      usuario.id,
    );
  }

  @Permissoes('ADM')
  @Delete('remover/:id')
  remove(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ChamadoResponseDto> {
    return this.chamadoService.remove(id, usuario.id);
  }
}
