import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { Chamado, StatusChamado } from '@prisma/client';
import { CreateChamadoDto } from './dto/create-chamado.dto';
import { UpdateChamadoDto } from './dto/update-chamado.dto';
import { AppService } from "src/app.service";

@Injectable()
export class ChamadoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logService: LogsService,
    private readonly app: AppService,
  ) {}

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string,
    status?: 'NOVO' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'FECHADO',
    categoriaId?: string,
    subcategoriaId?: string,
  ): Promise<{
    total: number;
    pagina: number;
    limite: number;
    data: Chamado[];
  }> {
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

    const data = await this.prisma.chamado.findMany({
      where: searchParams,
      include: { categoria: true, subcategoria: true, criador: true },
      orderBy: { criadoEm: 'desc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });

    return { total, pagina, limite, data };
  }

  async findOne(id: string): Promise<Chamado> {
    const chamado = await this.prisma.chamado.findUnique({
      where: { id },
      include: {
        categoria: true,
        subcategoria: true,
        criador: true,
      },
    });
    if (!chamado)
      throw new NotFoundException(`Chamado com id ${id} não encontrado.`);
    return chamado;
  }

  async create(
    createChamadoDto: CreateChamadoDto,
    usuarioId: string,
  ): Promise<Chamado> {
    try {
      const chamado = await this.prisma.chamado.create({
        data: {
          ...createChamadoDto,
          criadorId: usuarioId,
        },
      });

      await this.logService.criarLog(
        usuarioId,
        'CREATE',
        'Chamado',
        chamado.id.toString(),
      );

      return chamado;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar chamado.');
    }
  }

  async update(
    id: string,
    updateChamadoDto: UpdateChamadoDto,
    usuarioId: string,
  ): Promise<Chamado> {
    await this.findOne(id);

    try {
      const atualizado = await this.prisma.chamado.update({
        where: { id },
        data: updateChamadoDto,
      });

      await this.logService.criarLog(
        usuarioId,
        'UPDATE',
        'Chamado',
        atualizado.id.toString(),
      );

      return atualizado;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar chamado.');
    }
  }

  async remove(id: string, usuarioId: string): Promise<Chamado> {
    await this.findOne(id);

    try {
      const excluido = await this.prisma.chamado.delete({ where: { id } });

      await this.logService.criarLog(
        usuarioId,
        'DELETE',
        'Chamado',
        excluido.id.toString(),
      );

      return excluido;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao excluir chamado.');
    }
  }

  async mudarStatus(
    id: string,
    status: StatusChamado,
    usuarioId: string,
  ): Promise<Chamado> {
    await this.findOne(id);

    try {
      const atualizado = await this.prisma.chamado.update({
        where: { id },
        data: { status },
      });

      await this.logService.criarLog(
        usuarioId,
        'UPDATE',
        'Chamado',
        atualizado.id.toString(),
        `Status: ${status}`,
      );

      return atualizado;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar status do chamado.',
      );
    }
  }
}
