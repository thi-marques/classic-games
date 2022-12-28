import { Field, InputType, ID, ObjectType } from '@nestjs/graphql'
import { PlayerDB } from 'prisma/prisma-client'
import { Match } from './match.model'

@ObjectType()
export class Player implements PlayerDB {
  @Field(type => ID)
  id!: string

  @Field({ description: `Player's full name` })
  name!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field(type => [Match])
  matches!: Match[]
}

@InputType()
export class PlayerQueryInput implements Partial<Player> {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field({ description: `Player's full name`, nullable: true })
  name?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}

type PlayerCreate = Omit<Player, 'id' | 'createdAt' | 'updatedAt' | 'matches'>

@InputType()
export class PlayerCreateInput implements PlayerCreate {
  @Field()
  name!: string
}
