import { Field, InputType, ID, Int, ObjectType } from '@nestjs/graphql'
import { ScoreDB } from '@prisma/client'

@ObjectType()
export class Score implements ScoreDB {
  @Field(type => ID)
  id!: number

  @Field(type => Int)
  score!: number

  @Field(type => Int)
  playerId!: number

  @Field(type => Int)
  matchId!: number

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

@InputType()
export class ScoreCreate implements Omit<Score, 'id' | 'createdAt' | 'updatedAt'> {
  @Field(type => Int)
  score!: number

  @Field(type => Int)
  playerId!: number

  @Field(type => Int)
  matchId!: number
}
