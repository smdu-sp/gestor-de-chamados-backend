import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { CategoriaModule } from './categoria/categoria.module';
import { AcompanhamentoModule } from './acompanhamento/acompanhamento.module';
import { ChamadoModule } from './chamado/chamado.module';
import { LogModule } from './logs/log.module';
import { SubCategoriaModule } from './subcategoria/subcategoria.module';

@Global()
@Module({
  exports: [AppService],
  imports: [
    PrismaModule,
    AuthModule,
    UsuariosModule,
    CategoriaModule,
    AcompanhamentoModule,
    ChamadoModule,
    LogModule,
    SubCategoriaModule
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
