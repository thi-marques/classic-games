import { Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { Player } from '@prisma/client'

type PlayerCreate = Omit<Player, 'id' | 'createdAt' | 'updatedAt'>

@Controller('players')
export class PlayerController {
  constructor(private readonly appService: PrismaService) {}

  @Get()
  getPlayers(): Promise<Player[]> {
    return this.appService.player.findMany({ include: { scores: true } })
  }

  @Post()
  createPlayer(player: PlayerCreate): Promise<Player> {
    return this.appService.player.create({ data: player })
  }
}
