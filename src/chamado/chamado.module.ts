import { Module } from '@nestjs/common';
import { ChamadoService } from './chamado.service';
import { ChamadoController } from './chamado.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ChamadoController],
  providers: [ChamadoService, PrismaService, LogsService, AppService],
})
export class ChamadoModule {}
