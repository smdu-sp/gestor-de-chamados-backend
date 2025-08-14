import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { LogsModule } from 'src/logs/logs.module'; 

@Module({
  imports: [LogsModule],
  providers: [CategoriaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}
