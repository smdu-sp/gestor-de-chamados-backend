import { Module } from '@nestjs/common';
import { AcompanhamentoService } from './acompanhamento.service';
import { AcompanhamentoController } from './acompanhamento.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AcompanhamentoController],
  providers: [AcompanhamentoService, PrismaService],
})
export class AcompanhamentoModule {}
