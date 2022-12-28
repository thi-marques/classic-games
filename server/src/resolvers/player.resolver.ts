import { Query, Args, Parent, ResolveField, Resolver, Mutation } from '@nestjs/graphql'
import { Player, PlayerCreateInput } from 'src/models/player.model'
import { PlayerDB } from 'prisma/prisma-client'
import { Match } from 'src/models/match.model'
import { PrismaService } from 'src/services/prisma.service'

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [Player], { name: 'players' })
  async getPlayers() {
    return this.prisma.playerDB.findMany()
  }

  @ResolveField('matches', returns => [Match])
  async getMatches(@Parent() player: PlayerDB) {
    console.log(`Resolving matches for ${player.name}`)

    return await this.prisma.matchDB.findMany({
      where: {
        scores: {
          some: {
            playerId: player.id,
          },
        },
      },
    })
  }

  @Mutation(returns => Player)
  async createPlayer(@Args('player', { type: () => PlayerCreateInput }) player: PlayerCreateInput) {
    return this.prisma.playerDB.create({ data: player })
  }
}
