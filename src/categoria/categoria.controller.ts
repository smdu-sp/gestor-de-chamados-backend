import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {
  CategoriaResponseDto,
  CategoriaPaginadoResponseDto,
} from './dto/categoria-response.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Categoria')
@ApiBearerAuth()
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
  ): Promise<CategoriaPaginadoResponseDto> {
    return this.categoriaService.buscarTudo(+pagina, +limite, busca);
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-por-id/:id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.findOne(id);
  }

  @Permissoes('ADM', 'USR')
  @Post('criar')
  create(
    @Body() createCategoriaDto: CreateCategoriaDto
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Permissoes('ADM', 'TEC')
  @Put('atualizar/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Permissoes('ADM')
  @Delete('remover/:id')
  remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<CategoriaResponseDto> {
    return this.categoriaService.remove(id);
  }
}
