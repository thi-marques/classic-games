// Nest
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/modules/app.module'
import { PrismaService } from 'src/services/prisma.service'
// Environment variables
import { port } from './util/env'

async function bootstrap(port: string | number = 3000) {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)

  console.log(`🚀 Running on http://localhost:${port}/graphql`)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
}

bootstrap(port)
