import { Test, TestingModule } from '@nestjs/testing'
import { PlayerResolver } from './player.resolver'
import { PrismaService } from 'src/services/prisma.service'
import { describe, beforeAll, beforeEach, expect, it } from 'vitest'
import { Player } from 'src/models/player.model'

declare module 'vitest' {
  interface TestContext {
    playerResolver: PlayerResolver
    prisma: PrismaService
  }
}

const mockPlayer: PartialProps<Player, 'id' | 'createdAt' | 'updatedAt' | 'matches'> = {
  name: 'Thiago Marques',
}

describe('PlayerResolver', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [PrismaService, PlayerResolver],
    }).compile()
  })

  beforeEach(async context => {
    context.playerResolver = app.get(PlayerResolver)
    context.prisma = app.get(PrismaService)
  })

  describe('createPlayers', () => {
    it('should NOT create player without name', async ({ playerResolver }) => {
      const tryToCreatePlayerWithoutName = async () => await playerResolver.createPlayer({} as any)

      expect(tryToCreatePlayerWithoutName).rejects.toThrowError('name is missing')
    })

    it('should create player', async ({ playerResolver }) => {
      const playerCreated = await playerResolver.createPlayer({
        name: mockPlayer.name,
      })

      expect(playerCreated).toHaveProperty('name', mockPlayer.name)
    })
  })

  describe('getPlayers', () => {
    it('should return players list', async ({ playerResolver }) => {
      const players = await playerResolver.getPlayers()
      const playerThiago = players.find(p => p.name === mockPlayer.name)

      expect(players).toBeInstanceOf(Array)
      expect(playerThiago).toHaveProperty('name', mockPlayer.name)
      expect(playerThiago).toHaveProperty('id')
      expect(playerThiago).toHaveProperty('createdAt')
      expect(playerThiago).toHaveProperty('updatedAt')
    })
  })

  describe('getMatches', () => {
    it('should return getMatches list for selected player', async ({ playerResolver, prisma }) => {
      const player = await prisma.playerDB.findFirst({ where: { name: mockPlayer.name } })
      const matches = await playerResolver.getMatches(player!)

      expect(matches).toBeInstanceOf(Array)
      // TODO
      //expect(matchesThiago[0]).toHaveProperty('id')
      //expect(matchesThiago[0]).toHaveProperty('gameId')
    })
  })
})
