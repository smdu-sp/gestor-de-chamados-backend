import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AcompanhamentoService } from './acompanhamento.service';
import { CreateAcompanhamentoDto } from './dto/create-acompanhamento.dto';
import { UpdateAcompanhamentoDto } from './dto/update-acompanhamento.dto';
import { AcompanhamentoResponseDto } from './dto/acompanhamento-response.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Acompanhamentos')
@ApiBearerAuth()
@Controller('acompanhamentos')
export class AcompanhamentoController {
  constructor(private readonly acompanhamentoService: AcompanhamentoService) {}

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-tudo')
  findAll(): Promise<AcompanhamentoResponseDto[]> {
    return this.acompanhamentoService.findAll();
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-por-id/:id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<AcompanhamentoResponseDto> {
    return this.acompanhamentoService.findOne(id);
  }

  @Permissoes('ADM', 'USR')
  @Post('criar')
  create(
    @UsuarioAtual() usuario: Usuario,
    @Body() dto: CreateAcompanhamentoDto,
  ): Promise<AcompanhamentoResponseDto> {
    return this.acompanhamentoService.create(dto, usuario.id);
  }

  @Permissoes('ADM', 'TEC')
  @Patch('atualizar/:id')
  update(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateAcompanhamentoDto,
  ): Promise<AcompanhamentoResponseDto> {
    return this.acompanhamentoService.update(id, dto, usuario.id);
  }

  @Permissoes('ADM')
  @Delete('remover/:id')
  remove(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<AcompanhamentoResponseDto> {
    return this.acompanhamentoService.remove(id, usuario.id);
  }
}
