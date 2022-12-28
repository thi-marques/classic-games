import { Test, TestingModule } from '@nestjs/testing'
import { GameResolver } from './game.resolver'
import { Game } from 'src/models/game.model'
import { PrismaService } from 'src/services/prisma.service'
import { describe, beforeAll, beforeEach, expect, it } from 'vitest'

declare module 'vitest' {
  interface TestContext {
    gameResolver: GameResolver
    prisma: PrismaService
  }
}

const mockGame = {
  title: 'Matching Game',
  maxPlayers: 2,
} as const satisfies PartialProps<Game, 'id' | 'description' | 'howToPlay' | 'matches'>

describe.only('GameResolver', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [PrismaService, GameResolver],
    }).compile()
  })

  beforeEach(async context => {
    context.gameResolver = app.get(GameResolver)
    context.prisma = app.get(PrismaService)
  })

  describe('createGame', () => {
    it('should NOT create game without title', async ({ gameResolver }) => {
      const tryToCreateGameWithoutTitle = async () => await gameResolver.createGame({} as any)

      expect(tryToCreateGameWithoutTitle).rejects.toThrowError('title is missing')
    })

    it('should create game', async ({ gameResolver }) => {
      const gameCreated = await gameResolver.createGame({
        title: mockGame.title,
        maxPlayers: mockGame.maxPlayers,
      })

      expect(gameCreated).toHaveProperty('id')
      expect(gameCreated).toHaveProperty('title', mockGame.title)
      expect(gameCreated).toHaveProperty('description')
      expect(gameCreated).toHaveProperty('howToPlay')
      expect(gameCreated).toHaveProperty('maxPlayers', mockGame.maxPlayers)
    })
  })

  describe('getGames', () => {
    it('should return games list', async ({ gameResolver }) => {
      const games = await gameResolver.getGames()
      const game = games.find(g => g.title === mockGame.title)

      expect(games).toBeInstanceOf(Array)
      expect(game).toHaveProperty('id')
      expect(game).toHaveProperty('title', mockGame.title)
      expect(game).toHaveProperty('description')
      expect(game).toHaveProperty('howToPlay')
      expect(game).toHaveProperty('maxPlayers', mockGame.maxPlayers)
    })
  })

  describe('getMatches', () => {
    it('should return getMatches list for selected game', async ({ gameResolver, prisma }) => {
      const game = await prisma.gameDB.findFirst({ where: { title: mockGame.title } })
      const matches = await gameResolver.getMatches(game!)

      expect(matches).toBeInstanceOf(Array)
      // TODO
      //expect(matchesThiago[0]).toHaveProperty('id')
      //expect(matchesThiago[0]).toHaveProperty('gameId')
    })
  })
})
