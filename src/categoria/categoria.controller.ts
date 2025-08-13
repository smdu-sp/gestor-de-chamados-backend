import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';

@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get('buscar-tudo')
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get('buscar-por-id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }

  @Permissoes('ADM')
  @Post('criar')
  create(
    @UsuarioAtual() usuario: Usuario,
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriaService.create(createCategoriaDto, usuario.id);
  }

  @Permissoes('ADM')
  @Put('atualizar/:id')
  update(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto, usuario.id);
  }

  @Permissoes('ADM')
  @Delete('desativar/:id')
  remove(
    @UsuarioAtual() usuario: Usuario,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriaService.remove(id, usuario.id);
  }
}
