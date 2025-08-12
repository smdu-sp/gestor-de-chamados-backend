import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}


  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async create(data: { nome: string }): Promise<Categoria> {
    return this.prisma.categoria.create({ data });
  }

  async update(id: number, data: { nome?: string }): Promise<Categoria> {
    return this.prisma.categoria.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Categoria> {
    return this.prisma.categoria.delete({ where: { id } });
  }
}
