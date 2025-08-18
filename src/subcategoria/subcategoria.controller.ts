import { SubCategoriaService } from './subcategoria.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { SubCategoriaPaginadoResponseDto, SubCategoriaResponseDto } from './dto/subcategoria-response.dto';
import { CreateSubCategoriaDto } from './dto/create-subcatgoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-subcategoria.dto';


@ApiTags('Subcategoria')
@ApiBearerAuth()
@Controller('subcategoria')
export class SubCategoriaController {
  constructor(private readonly subcategoriaService: SubCategoriaService) {}

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
  ): Promise<SubCategoriaPaginadoResponseDto> {
    return this.subcategoriaService.buscarTudo(+pagina, +limite, busca);
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('buscar-por-id/:id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<SubCategoriaResponseDto> {
    return this.subcategoriaService.findOne(id);
  }

  @Permissoes('ADM', 'USR')
  @Post('criar')
  create(
    @Body() createSubCategoriaDto: CreateSubCategoriaDto,
  ): Promise<SubCategoriaResponseDto> {
    return this.subcategoriaService.create(createSubCategoriaDto);
  }

  @Permissoes('ADM', 'TEC')
  @Put('atualizar/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoriaDto: UpdateSubCategoriaDto,
  ): Promise<SubCategoriaResponseDto> {
    return this.subcategoriaService.update(id, updateCategoriaDto);
  }

  @Permissoes('ADM')
  @Delete('remover/:id')
  remove(@Param('id', ParseIntPipe) id: string): Promise<SubCategoriaResponseDto> {
    return this.subcategoriaService.remove(id);
  }
}