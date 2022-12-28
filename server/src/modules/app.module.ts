import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PrismaService } from 'src/services/prisma.service'
// Resolvers
import { PlayerResolver } from 'src/resolvers/player.resolver'
import { GameResolver } from 'src/resolvers/game.resolver'
// Environment variables
import { isProduction } from 'src/util/env'
// Node
import { join } from 'node:path'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      debug: !isProduction,
      playground: !isProduction,
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService, PlayerResolver, GameResolver],
})
export class AppModule {}
