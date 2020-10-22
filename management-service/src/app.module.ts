import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), EnterpriseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
