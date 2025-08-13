import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(id);
  }

  @Post()
  create(@Body() body: { nome: string }) {
    return this.categoriaService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { nome?: string }) {
    return this.categoriaService.update(id, body);
  }

  @Put('ativar/:id')
  ativar(@Param('id') id: string) {
    return this.categoriaService.ativar(id);
  }
  
  @Put('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.categoriaService.excluir(id);
  }
}
