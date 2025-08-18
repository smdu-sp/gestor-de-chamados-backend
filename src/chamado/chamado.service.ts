import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogService } from 'src/logs/log.service';
import { StatusChamado } from '@prisma/client';
import { CreateChamadoDto } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { AppService } from 'src/app.service';
import {
  ChamadoResponseDto,
  ChamadoPaginadoResponseDto,
  ChamadoStatusResponseDto,
} from './dto/chamado-response.dto';

@Injectable()
export class ChamadoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logService: LogService,
    private readonly app: AppService,
  ) {}

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string,
    status?: 'NOVO' | 'ATRIBUIDO' | 'RESOLVIDO' | 'REJEITADO' | 'FECHADO',
    categoriaId?: string,
    subcategoriaId?: string,
  ): Promise<ChamadoPaginadoResponseDto> {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);

    const searchParams: any = {
      ...(busca && {
        OR: [
          { titulo: { contains: busca } },
          { descricao: { contains: busca } },
        ],
      }),
      ...(status && { status }),
      ...(categoriaId && { categoriaId }),
      ...(subcategoriaId && { subcategoriaId }),
    };

    const total = await this.prisma.chamado.count({ where: searchParams });
    if (total === 0) return { total: 0, pagina: 0, limite: 0, data: [] };

    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);

    const data: ChamadoResponseDto[] = await this.prisma.chamado.findMany({
      where: searchParams,
      include: { categoria: true, subcategoria: true, criador: true },
      orderBy: { criadoEm: 'desc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    return { total, pagina, limite, data };
  }

  async findOne(id: string): Promise<ChamadoResponseDto> {
    const chamado = await this.prisma.chamado.findUnique({
      where: { id },
      include: { categoria: true, subcategoria: true, criador: true, tecnicos: true, acompanhamentos: true },
    });
    if (!chamado)
      throw new NotFoundException(`Chamado com id ${id} não encontrado.`);
    return chamado;
  }

  async create(
    createChamadoDto: CreateChamadoDto,
    usuarioId: string,
  ): Promise<ChamadoResponseDto> {
    try {
      const chamado = await this.prisma.chamado.create({
        data: { ...createChamadoDto, criadorId: usuarioId },
        include: { criador: true },
      });

      await this.logService.criarLog(
        usuarioId,
        'CREATE',
        'Chamado',
        chamado.id.toString(),
      );

      return chamado;
    } catch {
      throw new InternalServerErrorException('Erro ao criar chamado.');
    }
  }

  async update(
    id: string,
    updateChamadoDto: UpdateChamadoDto,
    usuarioId: string,
  ): Promise<ChamadoResponseDto> {
    await this.findOne(id);

    try {
      const atualizado = await this.prisma.chamado.update({
        where: { id },
        data: updateChamadoDto,
        include: { criador: true },
      });

      await this.logService.criarLog(
        usuarioId,
        'UPDATE',
        'Chamado',
        atualizado.id.toString(),
      );

      return atualizado;
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar chamado.');
    }
  }

  async remove(id: string, usuarioId: string): Promise<ChamadoResponseDto> {
    await this.findOne(id);

    try {
      const excluido = await this.prisma.chamado.delete({
        where: { id },
        include: { criador: true },
      });

      await this.logService.criarLog(
        usuarioId,
        'DELETE',
        'Chamado',
        excluido.id.toString(),
      );

      return excluido;
    } catch {
      throw new InternalServerErrorException('Erro ao excluir chamado.');
    }
  }

  async mudarStatus(
    id: string,
    status: StatusChamado,
    usuarioId: string,
  ): Promise<ChamadoStatusResponseDto> {
    await this.findOne(id);

    try {
      await this.prisma.chamado.update({
        where: { id },
        data: { status },
      });

      await this.logService.criarLog(
        usuarioId,
        'UPDATE',
        'Chamado',
        id.toString(),
        `Status: ${status}`,
      );

      return { atualizado: true };
    } catch {
      throw new InternalServerErrorException(
        'Erro ao atualizar status do chamado.',
      );
    }
  }
}
