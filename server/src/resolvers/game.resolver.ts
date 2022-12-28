import { Query, Args, Parent, ResolveField, Resolver, Mutation } from '@nestjs/graphql'
import { Game, GameCreateInput } from 'src/models/game.model'
import { GameDB } from 'prisma/prisma-client'
import { Match } from 'src/models/match.model'
import { PrismaService } from 'src/services/prisma.service'

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [Game], { name: 'games' })
  async getGames() {
    return this.prisma.gameDB.findMany()
  }

  @ResolveField('matches', returns => [Match])
  async getMatches(@Parent() game: GameDB) {
    console.log(`Resolving matches for ${game.title}`)

    return await this.prisma.matchDB.findMany({ where: { gameId: game.id } })
  }

  @Mutation(returns => Game)
  async createGame(@Args('game', { type: () => GameCreateInput }) game: GameCreateInput) {
    return this.prisma.gameDB.create({ data: game })
  }
}
