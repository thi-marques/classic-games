import { Field, InputType, Int, ObjectType, ID } from '@nestjs/graphql'
import { MatchDB } from 'prisma/prisma-client'
import { Score } from './score.model'
import { Game } from './game.model'

@ObjectType()
export class Match implements MatchDB {
  @Field(type => ID)
  id!: number

  @Field(type => Int)
  gameId!: number

  @Field(type => Game)
  game!: Game

  @Field(type => [Score])
  scores!: Score[]
}

@InputType()
export class MatchCreate implements Omit<Match, 'id' | 'scores' | 'game'> {
  @Field(type => Int)
  id!: number

  @Field(type => Int)
  gameId!: number
}
