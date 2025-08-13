import { Module } from '@nestjs/common';
import { ChamadoService } from './chamado.service';
import { ChamadoController } from './chamado.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogService } from 'src/logs/log.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ChamadoController],
  providers: [ChamadoService, PrismaService, LogService, AppService],
})
export class ChamadoModule {}
