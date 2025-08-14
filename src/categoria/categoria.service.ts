import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categoria } from '@prisma/client';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class CategoriaService {
  constructor(
    private readonly logService: LogsService,
    private readonly prisma: PrismaService) {}

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string): Promise<Categoria | null> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });
    if (!categoria)
      throw new NotFoundException(`Categoria com id ${id} não encontrada.`);
    return categoria;
  }

  async create(
    createCategoriaDto: CreateCategoriaDto,
    usuarioId: string,
  ): Promise<Categoria> {
    const categoria = await this.prisma.categoria.create({
      data: createCategoriaDto,
    });

    await this.logService.criarLog(
      usuarioId,
      'CREATE',
      'Categoria',
      categoria.id.toString(),
      JSON.stringify(createCategoriaDto),
    );

    return categoria;
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
    usuarioId: string,
  ): Promise<Categoria> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria)
      throw new NotFoundException(`Categoria com id ${id} não encontrada.`);

    const categoriaAtualizada = await this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });

    await this.logService.criarLog(
      usuarioId,
      'UPDATE',
      'Categoria',
      id.toString(),
      JSON.stringify(updateCategoriaDto),
    );

    return categoriaAtualizada;
  }

  async ativar(id: string): Promise<{ ativado: boolean }> {
    await this.prisma.categoria.update({
      where: { id },
      data: { status: true },
    });
    return { ativado: true };
  }

  async remove(id: string, usuarioId: string): Promise<Categoria> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria)
      throw new NotFoundException(`Categoria com id ${id} não encontrada.`);

    const categoriaRemovida = await this.prisma.categoria.delete({
      where: { id },
    });

    await this.logService.criarLog(
      usuarioId,
      'DELETE',
      'Categoria',
      id.toString(),
      JSON.stringify(categoriaRemovida),
    );

    return categoriaRemovida;
  }
}
