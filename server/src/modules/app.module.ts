import { Module } from '@nestjs/common'
import { PlayerController } from 'src/controllers/player.controller'
import { PrismaService } from 'src/services/prisma.service'

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PrismaService],
})
export class AppModule {}
