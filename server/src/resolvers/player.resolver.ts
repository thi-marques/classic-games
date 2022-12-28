import { Query, Args, Parent, ResolveField, Resolver, Mutation } from '@nestjs/graphql'
import { Player, PlayerCreateInput, PlayerQueryInput } from 'src/models/player.model'
import { PlayerDB } from 'prisma/prisma-client'
import { Match } from 'src/models/match.model'
import { PrismaService } from 'src/services/prisma.service'
import { isEmpty } from 'src/util/object'

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [Player], { name: 'players' })
  async getPlayers(@Args('player', { nullable: true }) player?: PlayerQueryInput) {
    return isEmpty(player)
      ? this.prisma.playerDB.findMany()
      : this.prisma.playerDB.findMany({
          where: player,
        })
  }

  @ResolveField('matches', returns => [Match])
  async getMatches(@Parent() player: PlayerDB) {
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
