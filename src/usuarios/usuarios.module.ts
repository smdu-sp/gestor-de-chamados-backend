import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { LogsModule } from 'src/logs/logs.module';


@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [LogsModule],
})
export class UsuariosModule {}
