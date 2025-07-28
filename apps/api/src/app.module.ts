import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PlaceModule } from './place/place.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [PrismaModule, PlaceModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
