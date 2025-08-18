import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {
  CategoriaResponseDto,
  CategoriaPaginadoResponseDto,
} from './dto/categoria-response.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class CategoriaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly app: AppService,
  ) {}

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string,
  ): Promise<CategoriaPaginadoResponseDto> {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);

    const where: any = busca ? { nome: { contains: busca } } : {};

    const total = await this.prisma.categoria.count({ where });
    if (total === 0) return { total: 0, pagina: 0, limite: 0, data: [] };

    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);

    const categorias = await this.prisma.categoria.findMany({
      where,
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    const data: CategoriaResponseDto[] = categorias.map((c) => ({
      id: c.id,
      nome: c.nome,
    }));

    return { total, pagina, limite, data };
  }

  async findOne(id: string): Promise<CategoriaResponseDto> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria)
      throw new NotFoundException(`Categoria com id ${id} não encontrada.`);
    return { id: categoria.id, nome: categoria.nome };
  }

  async create(
    createCategoriaDto: CreateCategoriaDto
  ): Promise<CategoriaResponseDto> {
    try {
      const categoria = await this.prisma.categoria.create({
        data: createCategoriaDto,
      });

      return { id: categoria.id, nome: categoria.nome };
    } catch {
      throw new InternalServerErrorException('Erro ao criar categoria.');
    }
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto
  ): Promise<CategoriaResponseDto> {
    await this.findOne(id);

    try {
      const categoriaAtualizada = await this.prisma.categoria.update({
        where: { id },
        data: updateCategoriaDto,
      });

      return { id: categoriaAtualizada.id, nome: categoriaAtualizada.nome };
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar categoria.');
    }
  }

  async remove(id: string): Promise<CategoriaResponseDto> {
    await this.findOne(id);

    try {
      const categoriaRemovida = await this.prisma.categoria.delete({
        where: { id },
      });

      return { id: categoriaRemovida.id, nome: categoriaRemovida.nome };
    } catch {
      throw new InternalServerErrorException('Erro ao excluir categoria.');
    }
  }
}
