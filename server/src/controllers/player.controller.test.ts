import { Test, TestingModule } from '@nestjs/testing'
import { PlayerController } from './player.controller'
import { PrismaService } from 'src/services/prisma.service'
import { describe, beforeAll, beforeEach, expect, it } from 'vitest'

declare module 'vitest' {
  interface TestContext {
    playerController: PlayerController
  }
}

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [PrismaService],
    }).compile()
  })

  beforeEach(async context => {
    context.playerController = app.get(PlayerController)
  })

  describe('createPlayers', () => {
    it('should NOT create player without name', async ({ playerController }) => {
      const tryToCreatePlayerWithoutName = async () =>
        await playerController.createPlayer({} as any)

      expect(tryToCreatePlayerWithoutName).rejects.toThrowError('name is missing')
    })

    it('should create player', async ({ playerController }) => {
      const playerCreated = await playerController.createPlayer({
        name: 'Thiago Marques',
      })

      expect(playerCreated).toHaveProperty('name', 'Thiago Marques')
    })
  })

  describe('getPlayers', () => {
    it('should return players list', async ({ playerController }) => {
      const players = await playerController.getPlayers()

      expect(players).toBeInstanceOf(Array)
      expect(players[0]).toHaveProperty('name', 'Thiago Marques')
      expect(players[0]).toHaveProperty('id')
      expect(players[0]).toHaveProperty('scores')
      expect(players[0]).toHaveProperty('createdAt')
      expect(players[0]).toHaveProperty('updatedAt')
    })
  })
})
