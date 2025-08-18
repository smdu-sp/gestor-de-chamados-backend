import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAcompanhamentoDto } from './dto/create-acompanhamento.dto';
import { UpdateAcompanhamentoDto } from './dto/update-acompanhamento.dto';
import { AcompanhamentoResponseDto } from './dto/acompanhamento-response.dto';

@Injectable()
export class AcompanhamentoService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<AcompanhamentoResponseDto[]> {
    return this.prisma.acompanhamento.findMany({
      include: { chamado: true, usuario: true },
    });
  }

  async findOne(id: string): Promise<AcompanhamentoResponseDto> {
    const acompanhamento = await this.prisma.acompanhamento.findUnique({
      where: { id },
      include: { chamado: true, usuario: true },
    });
    if (!acompanhamento)
      throw new NotFoundException(
        `Acompanhamento com id ${id} não encontrado.`,
      );
    return acompanhamento;
  }

  async create(
    dto: CreateAcompanhamentoDto,
    usuarioId: string,
  ): Promise<AcompanhamentoResponseDto> {
    try {
      const acompanhamento = await this.prisma.acompanhamento.create({
        data: {
          ...dto,
          usuarioId,
        },
        include: { chamado: true, usuario: true },
      });

      return acompanhamento;
    } catch {
      throw new InternalServerErrorException('Erro ao criar acompanhamento.');
    }
  }

  async update(
    id: string,
    dto: UpdateAcompanhamentoDto,
    usuarioId: string,
  ): Promise<AcompanhamentoResponseDto> {
    await this.findOne(id);

    try {
      const atualizado = await this.prisma.acompanhamento.update({
        where: { id },
        data: dto,
        include: { chamado: true, usuario: true },
      });

      return atualizado;
    } catch {
      throw new InternalServerErrorException(
        'Erro ao atualizar acompanhamento.',
      );
    }
  }

  async remove(
    id: string,
    usuarioId: string,
  ): Promise<AcompanhamentoResponseDto> {
    await this.findOne(id);

    try {
      const excluido = await this.prisma.acompanhamento.delete({
        where: { id },
        include: { chamado: true, usuario: true },
      });

      return excluido;
    } catch {
      throw new InternalServerErrorException('Erro ao excluir acompanhamento.');
    }
  }
}
