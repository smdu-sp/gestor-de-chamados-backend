import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async create(data: { nome: string }): Promise<Categoria> {
    return this.prisma.categoria.create({ data });
  }

  async update(id: string, data: { nome?: string }): Promise<Categoria> {
    return this.prisma.categoria.update({ where: { id }, data });
  }

  async ativar(id: string): Promise<{ ativado: boolean }> {
    await this.prisma.categoria.update({
      where: { id },
      data: { status: true },
    });
    return { ativado: true };
  }

  async excluir(id: string): Promise<{ desativado: boolean }> {
    await this.prisma.categoria.update({
      data: { status: false },
      where: { id },
    });
    return { desativado: true };
  }
}
