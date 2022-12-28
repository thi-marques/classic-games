import { Field, InputType, Int, ObjectType, ID } from '@nestjs/graphql'
import { GameDB } from 'prisma/prisma-client'
import { Match } from './match.model'

@ObjectType()
export class Game implements GameDB {
  @Field(type => ID)
  id!: string

  @Field()
  title!: string

  @Field(type => String, { nullable: true })
  description!: string | null

  @Field(type => String, { nullable: true })
  howToPlay!: string | null

  @Field(type => Int, { nullable: true })
  maxPlayers!: number | null

  @Field(type => [Match])
  matches!: Match[]
}

type GameCreate = Omit<
  PartialProps<Game, 'description' | 'howToPlay' | 'maxPlayers'>,
  'id' | 'matches'
>

@InputType()
export class GameCreateInput implements GameCreate {
  @Field()
  title!: string

  @Field(type => String, { nullable: true })
  description?: string | null

  @Field(type => String, { nullable: true })
  howToPlay?: string | null

  @Field(type => Int, { nullable: true })
  maxPlayers?: number | null
}
