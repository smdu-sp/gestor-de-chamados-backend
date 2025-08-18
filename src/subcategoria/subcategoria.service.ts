import { UpdateSubCategoriaDto } from './dto/update-subcategoria.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SubCategoriaPaginadoResponseDto,
  SubCategoriaResponseDto,
} from './dto/subcategoria-response.dto';
import { CreateSubCategoriaDto } from './dto/create-subcatgoria.dto';

@Injectable()
export class SubCategoriaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly app: AppService,
  ) {}

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string,
  ): Promise<SubCategoriaPaginadoResponseDto> {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);

    const where: any = busca ? { nome: { contains: busca } } : {};

    const total = await this.prisma.subcategoria.count({ where });
    if (total === 0) return { total: 0, pagina: 0, limite: 0, data: [] };

    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);

    const subcategorias = await this.prisma.subcategoria.findMany({
      where,
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    const data: SubCategoriaResponseDto[] = subcategorias.map((c) => ({
      id: c.id,
      nome: c.nome,
    }));

    return { total, pagina, limite, data };
  }

  async findOne(id: string): Promise<SubCategoriaResponseDto> {
    const subcategoria = await this.prisma.subcategoria.findUnique({
      where: { id },
    });
    if (!subcategoria)
      throw new NotFoundException(`Subcategoria com id ${id} não encontrada.`);
    return { id: subcategoria.id, nome: subcategoria.nome };
  }

  async create(
    createSubCategoriaDto: CreateSubCategoriaDto,
  ): Promise<SubCategoriaResponseDto> {
    try {
      const subcategoria = await this.prisma.subcategoria.create({
        data: createSubCategoriaDto,
      });

      return { id: subcategoria.id, nome: subcategoria.nome };
    } catch {
      throw new InternalServerErrorException('Erro ao criar subcategoria.');
    }
  }

  async update(
    id: string,
    updateSubCategoriaDto: UpdateSubCategoriaDto,
  ): Promise<SubCategoriaResponseDto> {
    await this.findOne(id);

    try {
      const subcategoriaAtualizada = await this.prisma.subcategoria.update({
        where: { id },
        data: updateSubCategoriaDto,
      });

      return {
        id: subcategoriaAtualizada.id,
        nome: subcategoriaAtualizada.nome,
      };
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar subcategoria.');
    }
  }

  async remove(id: string): Promise<SubCategoriaResponseDto> {
    await this.findOne(id);

    try {
      const subcategoriaRemovida = await this.prisma.subcategoria.delete({
        where: { id },
      });

      return { id: subcategoriaRemovida.id, nome: subcategoriaRemovida.nome };
    } catch {
      throw new InternalServerErrorException('Erro ao excluir subcategoria.');
    }
  }
}
